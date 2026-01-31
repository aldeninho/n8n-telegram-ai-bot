// Root input (merged HTTP responses)
const root = items[0].json;

// Extract datasets
const data1m = root.data[0];     // 1 min
const data15m = root.data[1];    // 15 min
const data1h = root.data[2];     // 1 hour

// Normalize candle data
function normalize(values) {
  return values
    .map(v => ({
      time: new Date(v.datetime),
      open: parseFloat(v.open),
      high: parseFloat(v.high),
      low: parseFloat(v.low),
      close: parseFloat(v.close),
      volume: parseFloat(v.volume),
    }))
    .sort((a, b) => a.time - b.time);
}

// Generate BUY / SELL / NEUTRAL signal
function getSignal(candles) {
  if (candles.length < 2) return "NEUTRAL";

  const last = candles[candles.length - 1];
  const prev = candles[candles.length - 2];

  if (last.close > prev.close) return "BUY";
  if (last.close < prev.close) return "SELL";
  return "NEUTRAL";
}

// Compute entry, stop-loss, target
function computeLevels(candles, signal) {
  const last = candles[candles.length - 1];
  const entry = last.close;

  let stopLoss, target;

  if (signal === "BUY") {
    stopLoss = entry * 0.994;   // -0.6%
    target = entry * 1.006;     // +0.6%
  } else if (signal === "SELL") {
    stopLoss = entry * 1.006;   // +0.6%
    target = entry * 0.994;     // -0.6%
  } else {
    stopLoss = entry;
    target = entry;
  }

  return {
    entry: entry.toFixed(2),
    stopLoss: stopLoss.toFixed(2),
    target: target.toFixed(2),
  };
}

// Normalize datasets
const candles1m = normalize(data1m.values);
const candles15m = normalize(data15m.values);
const candles1h = normalize(data1h.values);

// Use 1h timeframe for signal generation
const signal = getSignal(candles1h);
const levels = computeLevels(candles1h, signal);

// Emoji for UX
const emoji =
  signal === "BUY" ?  :
  signal === "SELL" ? :
  ;

// Telegram-ready formatted message (MarkdownV2 safe)
const telegramMessage = `
*Technical Recommendation*

*Signal:* ${emoji} ${signal}
*Entry:* ${levels.entry.replace('.', '\\.')}
*Stop\\-Loss:* ${levels.stopLoss.replace('.', '\\.')}
*Target:* ${levels.target.replace('.', '\\.')}
`;

// Final output
return [
  {
    json: {
      ticker: data1m.meta.symbol,
      timeframe: "1h",
      signal,
      entry: levels.entry,
      stopLoss: levels.stopLoss,
      target: levels.target,
      telegramMessage,
      candles: {
        "1m": candles1m,
        "15m": candles15m,
        "1h": candles1h,
      }
    }
  }
];
