import React from 'react'

function FeatureItem({ feature }) {
  return (

    <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl">

      <span className="text-pink-500 text-2xl">
        ✓
      </span>

      <p className="text-gray-300 text-lg">
        {feature}
      </p>

    </div>
  )
}

export default FeatureItem