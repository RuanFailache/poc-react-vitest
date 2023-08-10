import Timer from "../../components/Timer";
import useTimer from "../../hooks/use-timer";

import styles from './Home.module.scss'

export default function Home(): JSX.Element {
    const {timer, isPaused, onStartTimer, onPauseTimer} = useTimer()
    return (
        <main className={styles.wrapper}>
            <div className={styles.content}>
                <h1 className={styles.title}>Meu cronometro</h1>

                <Timer timer={timer}/>

                <div className={styles.buttonGroup}>
                    <button onClick={onStartTimer} className={styles.button} disabled={!isPaused}>Iniciar</button>
                    <button onClick={onPauseTimer} className={styles.button}>Pausar</button>
                </div>
            </div>
        </main>
    )
}