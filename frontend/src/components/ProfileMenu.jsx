import React from 'react'

const ProfileMenu = () => {
  return (
    <div class="text-sm w-64 p-3 bg-white border border-gray-500/30 text-gray-800/80 rounded-md font-medium">
    <ul class="flex flex-col gap-px">
        <li class="flex items-center justify-between gap-3 bg-gray-500/20 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
            <a href="#">Notifications</a>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m8.997.667 2.575 5.216 5.759.842-4.167 4.058.983 5.734-5.15-2.709-5.15 2.709.984-5.734L.664 6.725l5.758-.842z" stroke="#1F2937" stroke-opacity="0.8" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </li>
        <li class="flex items-center justify-between gap-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-500/20 transition">
            <a href="#" class="-mr-px">Edit Preferences</a>
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.672 6.763 5.58 15.854l-.166 2.995 2.995-.166L17.5 9.59m-2.828-2.828 1.348-1.349a2 2 0 1 1 2.829 2.829L17.5 9.59m-2.828-2.828L17.5 9.591" stroke="#1F2937" stroke-width=".96" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </li>
    
    </ul>
</div>
  )
}

export default ProfileMenu