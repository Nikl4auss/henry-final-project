import Map from "../Map/Map";
import styles from './Sucursales.module.css'


export default function Sucursales(){
    return(
    <div>
        <h1>Sucursales</h1>
        <div className={styles.containerMap}>
            <Map />
        </div>
    </div>
    )
}