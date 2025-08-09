'use client'
import { useState, useRef, useEffect } from 'react'

const messages = {
  leave: [
    'いってらっしゃい。今日は風が強いから気をつけてね。',
    'いってらっしゃい。朝露で石がすべりやすくなってたよ。',
  ],
  return: [
    'おかえり。今日は静かな時間が流れていたよ。',
    'おかえり。虫たちがきれいな音を鳴らしてたんだ。',
  ],
}

export default function Home() {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClick = (type: 'leave' | 'return') => {
    const list = messages[type]
    const random = list[Math.floor(Math.random() * list.length)]
    setMessage(random)
    setVisible(true)

    // 連続クリック対策：タイマーを毎回リセット
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setVisible(false), 60000) // 60秒でフェードアウト
  }

  // アンマウント時に掃除
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      style={{
        backgroundImage: "url('/祠背景.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        position: 'relative',
        fontFamily:
          '"M PLUS Rounded 1c","Hiragino Maru Gothic ProN","Yu Gothic UI",sans-serif',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '3.5rem',
          paddingTop: '2rem',
          color: '#333',
          textShadow: '0 0 4px rgba(255,255,255,0.8)',
        }}
      >
        おかえりの祠
      </h1>

      {/* 吹き出し風メッセージ（下辺固定に変更） */}
      <div
        style={{
          position: 'absolute',
          // top: '450px', 
          bottom: '23rem',           // ← ここを基準に固定（数値は好みで微調整）
          left: '50%',
          transform: 'translateX(-50%)',

          background: 'rgba(255,255,255,0.85)',
          padding: '1em 1.4em',
          borderRadius: '1em',
          boxShadow: '0 0 8px rgba(0,0,0,0.1)',
          maxWidth: '80%',

          // ここから見た目/挙動
          display: 'inline-block',   // 内容に合わせてサイズ決定（上に伸びる）
          fontSize: '1.2rem',
          lineHeight: 1.7,
          whiteSpace: 'pre-line',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          willChange: 'opacity',
        }}
      >
        {message}
      </div>

      {/* ボタン（固定・サイズUP・透過はやや濃いめ） */}
      <div
        style={{
          position: 'fixed',
          bottom: '5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'nowrap',           // ← 折り返さない
          width: 'max-content',         // ← 内容に合わせる
        }}
      >
        {(['leave', 'return'] as const).map((type) => (
          <button
            key={type}
            onClick={() => handleClick(type)}
            className="greeting-button"
          >
            {type === 'leave' ? '行ってきます' : 'ただいま'}
          </button>
        ))}
      </div>

      <style jsx>{`
        .greeting-button {
          display: inline-flex;                 /* ← 内容中央寄せ＆高さ安定 */
          align-items: center;
          justify-content: center;
          padding: 0.9em 2em;
          font-size: 1.5rem;
          line-height: 1.2;                    /* ← 縦に伸びすぎ防止 */
          min-height: 48px;                    /* ← 最低高さを固定 */
          white-space: nowrap;                 /* ← 折り返さない！ */
          -webkit-text-size-adjust: 100%;      /* ← iOSの自動拡大を抑える */
          -webkit-appearance: none;            /* ← iOSの装飾をリセット */

          border: 1.5px solid rgba(100, 100, 100, 0.4);
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.4);
          color: #333;
          cursor: pointer;
          transition: background-color 0.2s ease, box-shadow 0.2s ease,
            transform 0.1s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .greeting-button:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }
        .greeting-button:active {
          transform: translateY(1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        /* 📱 モバイル縦画面のときは少しだけ小さめにして収まりを良くする */
        @media (max-width: 480px) {
          .greeting-button {
            font-size: 1.2rem;
            padding: 0.7em 1.6em;
            min-height: 44px;  /* タップしやすさは維持 */
          }
        }
      `}</style>
    </div>
  )
}
