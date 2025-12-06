import React from 'react'
const T = [
  { name: "Anil K", text: "I felt connected to the culture and people. The Wrongturn Club made my trip unforgettable!" },
  { name: "Dharma Raj", text: "Amazing experience and friendly guides." }
];
export default function Testimonials(){
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Testimonials</h3>
      <div className="space-y-3">
        {T.map((t,i)=>(
          <div key={i} className="p-3 border rounded">
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-gray-600">{t.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
