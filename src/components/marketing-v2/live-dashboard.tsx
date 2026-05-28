"use client";

import { useEffect, useState } from "react";

type Order = {
  t: string;
  id: string;
  items: string;
  amt: string;
  tm: string;
  state: "new" | "kitchen" | "ready";
};

const SEED: Order[] = [
  { t: "07", id: "#1284", items: "2× Капучино · 1× Багета", amt: "22.70", tm: "20:41", state: "new" },
  { t: "12", id: "#1283", items: "1× Espresso · 1× Кроасан", amt: "8.20", tm: "20:39", state: "kitchen" },
  { t: "04", id: "#1282", items: "2× Шприц · 1× Брускета", amt: "31.40", tm: "20:38", state: "kitchen" },
  { t: "19", id: "#1281", items: "1× Соев лате · 1× Тирамису", amt: "13.40", tm: "20:36", state: "ready" },
];

const POOL = [
  { t: "03", items: "1× Аперол · 1× Чипс", amt: "14.00" },
  { t: "11", items: "2× Капучино", amt: "9.00" },
  { t: "08", items: "1× Лате · 1× Кишлоч", amt: "11.20" },
  { t: "22", items: "3× Espresso", amt: "9.60" },
  { t: "15", items: "1× Соев лате · 1× Багета", amt: "13.50" },
];

export function LiveDashboard({
  title = "Café Slaveykov · Сряда",
  live = "НА ЖИВО",
  labels,
  ordersHead = "ПОРЪЧКИ В РЕАЛНО ВРЕМЕ",
  currency = "€",
}: {
  title?: string;
  live?: string;
  labels?: { today: string; tables: string; tips: string; tablesSuffix: string; tipsSuffix: string; todayDelta: string };
  ordersHead?: string;
  currency?: string;
}) {
  const [queue, setQueue] = useState<Order[]>(SEED);
  const lbl = labels ?? {
    today: "Днес",
    tables: "Маси",
    tips: "Бакшиш",
    tablesSuffix: "от 24",
    tipsSuffix: "среден 11.4%",
    todayDelta: "+18% спрямо вчера",
  };

  useEffect(() => {
    let n = 1285;
    const tick = () => {
      const pick = POOL[Math.floor(Math.random() * POOL.length)];
      const now = new Date();
      const tm = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      setQueue((q) => {
        const fresh: Order = { ...pick, id: "#" + n++, tm, state: "new" };
        const rest: Order[] = q.map((o, i) =>
          i === 0 ? { ...o, state: "kitchen" as const } : i === 1 ? { ...o, state: "ready" as const } : o
        );
        return [fresh, ...rest].slice(0, 4);
      });
    };
    const t = setInterval(tick, 4800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mp-dashboard">
      <div className="mp-dash-head">
        <div className="title">{title}</div>
        <div className="live"><span className="d" /> <span>{live}</span></div>
      </div>
      <div className="mp-dash-stats">
        <div className="mp-dash-stat">
          <div className="l">{lbl.today}</div>
          <div className="v">1 842<small>{currency}</small></div>
          <div className="delta">{lbl.todayDelta}</div>
        </div>
        <div className="mp-dash-stat">
          <div className="l">{lbl.tables}</div>
          <div className="v">14<small>/24</small></div>
          <div className="delta">{lbl.tablesSuffix}</div>
        </div>
        <div className="mp-dash-stat">
          <div className="l">{lbl.tips}</div>
          <div className="v">11.4<small>%</small></div>
          <div className="delta">{lbl.tipsSuffix}</div>
        </div>
      </div>
      <div className="mp-dash-orders">
        <div className="mp-dash-orders-head">{ordersHead}</div>
        {queue.slice(0, 4).map((o) => (
          <div key={o.id} className={`mp-ticket o-${o.state}`}>
            <div className="tb">{o.t}</div>
            <div className="det">
              <div className="top">
                <span className="pl">Маса {o.t}</span>
                <span className="id">{o.id}</span>
              </div>
              <div className="items">{o.items}</div>
            </div>
            <div className="meta">
              <div className="amt">{o.amt}{currency}</div>
              <div className="tm">{o.tm}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
