import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import L from 'leaflet';
import { Circle, Marker, Popup } from "react-leaflet";

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

    const style = `
                  background-color: grey;
                  width: 2rem;
                  height: 2rem;
                  display: block;
                  left: -1rem;
                  top: -1rem;
                  position: relative;
                  border-radius: 1rem 1rem 0;
                  transform: rotate(45deg);
                  border: 1px solid #FFFFFF`
                 


    return (
        <>
            <Marker
            icon={
              L.divIcon({
                html: `<span style="${style}" />`, 
                iconSize: [30, 30],
                className: 'user-icon'
              })
            }
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