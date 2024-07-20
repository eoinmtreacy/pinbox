import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Circle, Marker, Popup } from "react-leaflet";
import iconGen from '../../utils/iconGen';  

const UserMarker = ({ distance, position, setPosition }) => {
    const [draggable, setDraggable] = useState(true)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])


    return (
        <>
            <Marker
            icon={iconGen('me')}
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                {draggable
                    ? 'Marker is draggable'
                    : 'Click here to make marker draggable'}
                </span>
            </Popup>
            </Marker>
            <Circle 
                center={position}
                radius={distance}
                color='light-grey'
            />
        </>
      )
}

export default UserMarker;