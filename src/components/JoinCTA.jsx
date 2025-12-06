import React from 'react'
export default function JoinCTA(){
  return (
    <div className="bg-indigo-600 text-white p-8 rounded shadow text-center">
      <h2 className="text-2xl font-bold">Join the Wrong Turn Club</h2>
      <p className="mt-2">Subscribe to get updates on events, packages and exclusive invites.</p>
      <div className="mt-4 flex justify-center">
        <input placeholder="Enter email" className="p-2 rounded-l border-0"/>
        <button className="p-2 bg-black rounded-r">Join</button>
      </div>
    </div>
  )
}
