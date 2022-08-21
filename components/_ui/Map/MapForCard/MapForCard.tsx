import classes from './MapForCard.module.css'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'

interface props {
  readonly lat: number
  readonly lon: number
}

export default function MapForCard({ lat, lon }: props) {
  return (
    <div className={classes.container}>
      <MapContainer center={[lon, lat]} zoom={12} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker
          position={[lon, lat]}
          icon={L.divIcon({
            iconSize: [20, 20],
            iconAnchor: [20 / 2, 20],
            className: 'mymarker',
            html: "<img src='/icons/marker-black.svg' alt='marker'/>",
          })}
        />
      </MapContainer>
    </div>
  )
}
