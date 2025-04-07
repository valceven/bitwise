import Ellipse from '../assets/Ellipse.svg';
import Polygon from '../assets/Polygon.svg';
import Zigzag from '../assets/zig-zag.svg';
import React from 'react';

const EditBackground = () => {
  return (
    <div>
       <img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '10%', 
                    right: '5%', 
                    opacity: '0.2',
                }}
                src={Ellipse}
                alt="My Icon"
                className="flex h-1/10 z-0"
                />

                <img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '80%', 
                    right: '10%', 
                    opacity: '0.2',
                    rotate: '50deg',
                }}
                src={Zigzag}
                alt="My Icon"
                className="flex h-3 z-0"
                />

<img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '60%', 
                    right: '80%', 
                    opacity: '0.2',
                    rotate: '150deg',
                }}
                src={Zigzag}
                alt="My Icon"
                className="flex h-3 z-0"
                />

            <img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '50%', 
                    right: '20%', 
                    opacity: '0.2',
                }}
                src={Polygon}
                alt="My Icon"
                className="flex h-1/10 z-0"
                />

                <img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '30%', 
                    right: '85%', 
                    opacity: '0.2',
                }}
                src={Ellipse}
                alt="My Icon"
                className="flex h-1/10 z-0"
                />

                <img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    bottom: '10%', 
                    left: '5%', 
                    opacity: '0.2',
                }}
                src={Polygon}
                alt="My Icon"
                className="flex h-1/10 z-0"
                />


<img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '140%', 
                    left: '10%', 
                    opacity: '0.2',
                }}
                src={Ellipse}
                alt="My Icon"
                className="flex h-1/10 z-0"
                />

            <img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '120%', 
                    left: '80%', 
                    opacity: '0.2',
                }}
                src={Ellipse}
                alt="My Icon"
                className="flex h-1/10 z-0"
                />

<img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '180%', 
                    left: '5%', 
                    opacity: '0.2',
                }}
                src={Polygon}
                alt="My Icon"
                className="flex h-1/10 z-0"
                />


<img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '180%', 
                    left: '88%', 
                    opacity: '0.2',
                }}
                src={Polygon}
                alt="My Icon"
                className="flex h-1/10 z-0"
                />


<img
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    draggable: 'false',
                    position: 'absolute', 
                    top: '230%', 
                    left: '15%', 
                    opacity: '0.2',
                    rotate: '50deg',
                }}
                src={Zigzag}
                alt="My Icon"
                className="flex h-4 z-0"
                />

    </div>
  );
}

export default EditBackground;