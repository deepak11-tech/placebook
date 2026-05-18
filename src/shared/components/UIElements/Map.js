import React, { useRef, useEffect } from 'react'
import './Map.css'

const Map = (props) => {
  const mapRef = useRef()

  const { center, zoom } = props

  useEffect(() => {
    // safety check
    if (!window.ol || !mapRef.current) return

    const ol = window.ol

    //  Convert coordinates
    const position = ol.proj.fromLonLat([center.lng, center.lat])

    //  Create marker
    const marker = new ol.Feature({
      geometry: new ol.geom.Point(position),
    })

    //  Custom marker style (RED PIN)
    marker.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.05,
        }),
      }),
    )

    //  Layer for marker
    const vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [marker],
      }),
    })

    //  Create map
    const map = new ol.Map({
      target: mapRef.current,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        vectorLayer,
      ],
      view: new ol.View({
        center: position,
        zoom: zoom,
      }),
    })

    //  cleanup (important for modal)
    return () => {
      map.setTarget(null)
    }
  }, [center, zoom])

  return (
    <div
      ref={mapRef}
      className='map'
      style={{ width: '100%', height: '100%' }}
    ></div>
  )
}

export default Map
