import Ellipse from '../assets/Ellipse.svg';
import Polygon from '../assets/Polygon.svg';
import Zigzag from '../assets/zig-zag.svg';
import React from 'react';

const EditBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Bold gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 via-pink-100 to-orange-100" />
      
      {/* Enhanced colorful floating shapes */}
      <div className="absolute inset-0">
        {/* Top area - Bold Blue themed */}
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '5%', 
            right: '8%', 
            filter: 'hue-rotate(200deg) saturate(200%) brightness(1.4)',
            transform: 'rotate(10deg)',
          }}
          src={Ellipse}
          alt="Decorative shape"
          className="h-20 w-20 opacity-60 animate-pulse"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '12%', 
            right: '25%', 
            filter: 'hue-rotate(220deg) saturate(180%) brightness(1.3)',
            transform: 'rotate(-15deg)',
          }}
          src={Zigzag}
          alt="Decorative shape"
          className="h-12 w-12 opacity-55"
        />

        {/* Top left area - Bold Purple themed */}
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '8%', 
            left: '5%', 
            filter: 'hue-rotate(260deg) saturate(220%) brightness(1.5)',
            transform: 'rotate(35deg)',
          }}
          src={Polygon}
          alt="Decorative shape"
          className="h-16 w-16 opacity-65 animate-bounce"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '18%', 
            left: '20%', 
            filter: 'hue-rotate(280deg) saturate(190%) brightness(1.4)',
            transform: 'rotate(-25deg)',
          }}
          src={Ellipse}
          alt="Decorative shape"
          className="h-10 w-10 opacity-50"
        />

        {/* Center right - Bold Pink/Magenta themed */}
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '35%', 
            right: '10%', 
            filter: 'hue-rotate(320deg) saturate(250%) brightness(1.6)',
            transform: 'rotate(55deg)',
          }}
          src={Zigzag}
          alt="Decorative shape"
          className="h-14 w-14 opacity-70"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '45%', 
            right: '28%', 
            filter: 'hue-rotate(300deg) saturate(210%) brightness(1.4)',
            transform: 'rotate(75deg)',
          }}
          src={Polygon}
          alt="Decorative shape"
          className="h-8 w-8 opacity-55"
        />

        {/* Center left - Bold Teal/Cyan themed */}
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '40%', 
            left: '8%', 
            filter: 'hue-rotate(180deg) saturate(200%) brightness(1.5)',
            transform: 'rotate(-40deg)',
          }}
          src={Ellipse}
          alt="Decorative shape"
          className="h-18 w-18 opacity-60"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '50%', 
            left: '25%', 
            filter: 'hue-rotate(160deg) saturate(180%) brightness(1.3)',
            transform: 'rotate(20deg)',
          }}
          src={Zigzag}
          alt="Decorative shape"
          className="h-10 w-10 opacity-50"
        />

        {/* Middle area - Bold Yellow/Orange themed */}
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '30%', 
            left: '45%', 
            filter: 'hue-rotate(45deg) saturate(240%) brightness(1.7)',
            transform: 'rotate(-60deg)',
          }}
          src={Polygon}
          alt="Decorative shape"
          className="h-12 w-12 opacity-65"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '25%', 
            right: '45%', 
            filter: 'hue-rotate(30deg) saturate(220%) brightness(1.5)',
            transform: 'rotate(80deg)',
          }}
          src={Ellipse}
          alt="Decorative shape"
          className="h-8 w-8 opacity-55"
        />

        {/* Bottom left - Bold Green themed */}
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            bottom: '15%', 
            left: '6%', 
            filter: 'hue-rotate(120deg) saturate(230%) brightness(1.6)',
            transform: 'rotate(70deg)',
          }}
          src={Polygon}
          alt="Decorative shape"
          className="h-16 w-16 opacity-70"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            bottom: '25%', 
            left: '22%', 
            filter: 'hue-rotate(100deg) saturate(200%) brightness(1.4)',
            transform: 'rotate(-50deg)',
          }}
          src={Zigzag}
          alt="Decorative shape"
          className="h-10 w-10 opacity-60"
        />

        {/* Bottom right - Bold Orange/Red themed */}
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            bottom: '18%', 
            right: '12%', 
            filter: 'hue-rotate(15deg) saturate(250%) brightness(1.8)',
            transform: 'rotate(-35deg)',
          }}
          src={Zigzag}
          alt="Decorative shape"
          className="h-14 w-14 opacity-75"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            bottom: '8%', 
            right: '30%', 
            filter: 'hue-rotate(0deg) saturate(220%) brightness(1.6)',
            transform: 'rotate(45deg)',
          }}
          src={Ellipse}
          alt="Decorative shape"
          className="h-12 w-12 opacity-65"
        />

        {/* Additional scattered elements for richness */}
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '65%', 
            left: '35%', 
            filter: 'hue-rotate(280deg) saturate(180%) brightness(1.3)',
            transform: 'rotate(25deg)',
          }}
          src={Ellipse}
          alt="Decorative shape"
          className="h-8 w-8 opacity-45"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '75%', 
            right: '55%', 
            filter: 'hue-rotate(90deg) saturate(200%) brightness(1.4)',
            transform: 'rotate(-30deg)',
          }}
          src={Polygon}
          alt="Decorative shape"
          className="h-10 w-10 opacity-50"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '55%', 
            right: '40%', 
            filter: 'hue-rotate(240deg) saturate(190%) brightness(1.5)',
            transform: 'rotate(90deg)',
          }}
          src={Zigzag}
          alt="Decorative shape"
          className="h-6 w-6 opacity-40"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            bottom: '35%', 
            left: '55%', 
            filter: 'hue-rotate(60deg) saturate(210%) brightness(1.6)',
            transform: 'rotate(-75deg)',
          }}
          src={Polygon}
          alt="Decorative shape"
          className="h-8 w-8 opacity-55"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            bottom: '45%', 
            right: '65%', 
            filter: 'hue-rotate(140deg) saturate(180%) brightness(1.4)',
            transform: 'rotate(15deg)',
          }}
          src={Ellipse}
          alt="Decorative shape"
          className="h-6 w-6 opacity-45"
        />

        {/* Extra corner elements */}
        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            top: '5%', 
            left: '35%', 
            filter: 'hue-rotate(190deg) saturate(170%) brightness(1.2)',
            transform: 'rotate(50deg)',
          }}
          src={Zigzag}
          alt="Decorative shape"
          className="h-6 w-6 opacity-40"
        />

        <img
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            draggable: 'false',
            position: 'absolute', 
            bottom: '5%', 
            left: '40%', 
            filter: 'hue-rotate(330deg) saturate(200%) brightness(1.5)',
            transform: 'rotate(-20deg)',
          }}
          src={Polygon}
          alt="Decorative shape"
          className="h-10 w-10 opacity-60"
        />

        {/* Bold animated gradient orbs */}
        <div className="absolute top-16 left-1/3 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-ping" />
        <div className="absolute top-20 right-1/3 w-32 h-32 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-25 animate-pulse" />
        <div className="absolute bottom-16 right-1/4 w-36 h-36 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-18 animate-bounce" />
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full opacity-22 animate-pulse" />
        <div className="absolute top-1/2 left-12 w-24 h-24 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full opacity-20 animate-ping" />
        <div className="absolute top-1/3 right-12 w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full opacity-25 animate-bounce" />

        {/* Additional floating gradient shapes */}
        <div className="absolute top-1/4 left-2/3 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-1/3 right-2/3 w-18 h-18 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-25 animate-ping" />
      </div>
    </div>
  );
}

export default EditBackground;