import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const map = searchParams.get("map");
  const mode = searchParams.get("mode");

  // If a specific map is requested → return brawler win rates for that map
  if (map) {
    const { data, error } = await supabase.rpc("get_map_meta", {
      map_name: map,
    });

    // If the RPC doesn't exist yet, fall back to a raw query approach
    if (error) {
      // Fallback: manual join query via two separate calls
      const { data: battles } = await supabase
        .from("battles")
        .select("id")
        .eq("map", map);

      if (!battles || battles.length === 0) {
        return NextResponse.json({ brawlers: [], totalBattles: 0 });
      }

      const battleIds = battles.map((b) => b.id);

      // Supabase doesn't support GROUP BY directly via the client,
      // so we'll fetch all battle_players for these battles and aggregate in JS
      const allPlayers: any[] = [];
      // Fetch in chunks of 500 battle IDs
      for (let i = 0; i < battleIds.length; i += 500) {
        const chunk = battleIds.slice(i, i + 500);
        const { data: players } = await supabase
          .from("battle_players")
          .select("brawler_id, brawler_name, won")
          .in("battle_id", chunk);
        if (players) allPlayers.push(...players);
      }

      // Aggregate
      const stats = new Map<
        number,
        { name: string; picks: number; wins: number }
      >();
      for (const p of allPlayers) {
        const existing = stats.get(p.brawler_id) || {
          name: p.brawler_name,
          picks: 0,
          wins: 0,
        };
        existing.picks++;
        if (p.won) existing.wins++;
        stats.set(p.brawler_id, existing);
      }

      const brawlers = Array.from(stats.entries())
        .map(([id, s]) => ({
          brawlerId: id,
          name: s.name,
          picks: s.picks,
          wins: s.wins,
          winRate: Math.round((s.wins / s.picks) * 10000) / 100,
        }))
        .sort((a, b) => b.winRate - a.winRate);

      return NextResponse.json({
        map,
        totalBattles: battles.length,
        brawlers,
      });
    }

    return NextResponse.json(data);
  }

  // If mode is specified → return maps for that mode
  // If neither → return all modes with their maps and battle counts
  let query = supabase
    .from("battles")
    .select("mode, map", { count: "exact" });

  if (mode) {
    query = query.eq("mode", mode);
  }

  // Get distinct mode/map combos with counts
  // Again, Supabase client doesn't do GROUP BY, so fetch and aggregate
  const { data: battles, error: bErr } = await supabase
    .from("battles")
    .select("mode, map");

  if (bErr || !battles) {
    return NextResponse.json({ modes: [] });
  }

  // Aggregate: mode → map → count
  const modeMap = new Map<string, Map<string, number>>();
  for (const b of battles) {
    if (mode && b.mode !== mode) continue;
    if (!modeMap.has(b.mode)) modeMap.set(b.mode, new Map());
    const maps = modeMap.get(b.mode)!;
    maps.set(b.map, (maps.get(b.map) || 0) + 1);
  }

  const modes = Array.from(modeMap.entries())
    .map(([modeName, maps]) => ({
      mode: modeName,
      totalBattles: Array.from(maps.values()).reduce((a, b) => a + b, 0),
      maps: Array.from(maps.entries())
        .map(([mapName, count]) => ({ name: mapName, battles: count }))
        .sort((a, b) => b.battles - a.battles),
    }))
    .sort((a, b) => b.totalBattles - a.totalBattles);

  return NextResponse.json({ modes });
}