import React from 'react'

export const Icon = ({icon, className}) => {
  switch (icon) {
    case 'undo':
      return (
        <svg viewBox="0 0 436.48 436.48" className={className}>
          <path d="M224,143.573c-56.427,0-107.84,21.013-147.2,55.467L0,122.24v192h192l-77.12-77.12    c29.547-24.853,67.413-40.213,109.12-40.213c75.627,0,139.627,49.173,162.027,117.333l50.453-16.64    C407.147,208.213,323.2,143.573,224,143.573z" />
        </svg>
      )
    case 'redo':
      return (
        <svg viewBox="0 0 436.48 436.48" className={className}>
          <path d="M359.573,199.04c-39.253-34.453-90.667-55.467-147.093-55.467c-99.2,0-183.147,64.64-212.48,154.027l50.453,16.64    c22.4-68.16,86.4-117.333,162.027-117.333c41.707,0,79.573,15.36,109.12,40.213l-77.12,77.12h192v-192L359.573,199.04z" />
        </svg>
      )
    case 'reset':
      return (
        <svg viewBox="0 0 512 512" className={className}>
          <path d="M478.213,163.264l-46.805-80.939c-5.099-9.344-16.107-14.229-27.648-9.963l-52.885,21.248    c-10.048-7.232-20.608-13.376-31.531-18.304L311.301,19.2C309.936,8.256,300.443,0,289.221,0h-93.867    c-11.221,0-20.715,8.256-22.059,19.008l-8.064,56.277c-10.581,4.8-20.971,10.859-31.467,18.325L80.731,72.299    c-10.197-3.925-22.357,0.491-27.435,9.771L6.405,163.157c-5.632,9.557-3.307,21.952,5.44,28.864l44.821,35.029    c-0.704,6.763-1.045,12.672-1.045,18.283s0.341,11.52,1.024,18.283l-44.843,35.051c-8.555,6.763-10.901,18.752-5.44,28.736    l46.805,80.96c5.099,9.323,16.128,14.208,27.669,9.941l52.885-21.248c10.048,7.232,20.608,13.376,31.531,18.304l8.043,56.085    c1.344,10.965,10.837,19.221,22.059,19.221h73.515c3.989,0,7.616-2.219,9.451-5.739c1.835-3.52,1.557-7.765-0.704-11.029    c-16.32-23.381-24.96-50.795-24.96-79.232c0-13.269,1.941-26.56,5.781-39.509c0.981-3.328,0.299-6.912-1.856-9.643    c-2.155-2.709-5.461-4.16-8.939-4.053c-1.152,0.064-2.283,0.213-5.184,0.576c-53.056,0-96.213-43.157-96.213-96.213    c0-53.056,43.157-96.235,96.213-96.235c53.056,0,96.213,43.157,96.021,97.984c-0.149,1.131-0.299,2.261-0.363,3.413    c-0.171,3.477,1.344,6.805,4.053,8.939c2.731,2.155,6.336,2.795,9.643,1.856c20.757-6.187,41.216-7.659,64.384-3.456    c2.837,0.512,5.952-0.768,8.341-2.539c2.368-1.771,3.947-5.056,4.267-8c0.043-0.384,0.149-2.112,0.149-2.496    c0-6.635-0.469-12.885-1.024-18.283L472.752,192C481.307,185.259,483.653,173.269,478.213,163.264z" />
          <path d="M497.989,298.667c-5.888,0-10.667,4.779-10.667,10.667v26.027c-16.085-28.309-48.213-58.027-96-58.027    c-64.704,0-117.333,52.629-117.333,117.333S326.619,512,391.323,512c5.888,0,10.667-4.779,10.667-10.667    c0-5.888-4.779-10.667-10.667-10.667c-52.928,0-96-43.072-96-96s43.072-96,96-96c50.304,0,77.973,41.557,84.779,64h-42.112    c-5.888,0-10.667,4.779-10.667,10.667c0,5.888,4.779,10.667,10.667,10.667h64c5.888,0,10.667-4.779,10.667-10.667v-64    C508.656,303.445,503.899,298.667,497.989,298.667z" />
        </svg>
      )
    case 'hide':
      return (
        <svg viewBox="0 0 491.996 491.996" className={className}>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848    L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128    c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084    c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224    C491.996,136.902,489.204,130.046,484.132,124.986z"
          />
        </svg>
      )
    case 'show':
      return (
        <svg viewBox="0 0 492.002 492.002" className={className}>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844    L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124    c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064    c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132    C494.624,356.041,494.624,338.965,484.136,328.473z"
          />
        </svg>
      )
    case 'copy':
      return (
        <svg viewBox="0 0 512 512" className={className}>
          <path d="M366.905,108.016h-141.91c-11.048,0-20.003,8.955-20.003,20.003s8.955,20.003,20.003,20.003h141.91    c11.048,0,20.003-8.955,20.003-20.003S377.952,108.016,366.905,108.016z" />
          <path d="M366.905,188.027h-141.91c-11.048,0-20.003,8.955-20.003,20.003s8.955,20.003,20.003,20.003h141.91    c11.047,0,20.003-8.955,20.003-20.003S377.953,188.027,366.905,188.027z" />
          <path d="M286.004,268.039h-61.009c-11.048,0-20.003,8.955-20.003,20.003c0,11.048,8.955,20.003,20.003,20.003h61.009    c11.048,0,20.003-8.955,20.003-20.003C306.007,276.994,297.052,268.039,286.004,268.039z" />
          <path d="M448.028,272.039c11.048,0,20.003-8.955,20.003-20.003V80.012C468.031,35.893,432.137,0,388.019,0H203.992    c-44.094,0-79.971,35.853-80.012,79.938c-44.118,0-80.012,35.893-80.012,80.012v272.039c0,44.118,35.893,80.012,80.012,80.012    h194.028c44.118,0,80.012-35.893,80.012-80.012v-0.608c39.414-4.938,70.01-38.662,70.01-79.389    c0-11.048-8.955-20.003-20.003-20.003c-11.048,0-20.003,8.955-20.003,20.003c0,22.054-17.942,40.001-39.996,40.006l-184.027,0.045    h-0.009c-10.685,0-20.73-4.16-28.285-11.715c-7.558-7.556-11.721-17.604-11.721-28.291V80.012    c0-22.059,17.947-40.006,40.006-40.006H388.02c22.059,0,40.006,17.947,40.006,40.006v172.025    C428.025,263.084,436.98,272.039,448.028,272.039z M203.992,432.047h0.02l154.002-0.038    c-0.012,22.049-17.954,39.984-40.006,39.984H123.981c-22.059,0-40.006-17.947-40.006-40.006V159.948    c0-22.059,17.947-40.006,40.006-40.006v232.094c0,21.375,8.325,41.471,23.441,56.583    C162.535,423.729,182.622,432.047,203.992,432.047z" />
        </svg>
      )
    default:
      return <></>
  }
}
