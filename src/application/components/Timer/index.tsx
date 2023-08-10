import styles from './Timer.module.scss'
import {ITimer} from "../../../domain/entities/Timer.ts";
import {parseTime} from "../../../utils/parser/time.ts";

interface ITimerProps {
    timer: ITimer
}

export default function Timer({timer}: ITimerProps): JSX.Element {
    return (
        <div className={styles.timer}>
            <div className={styles.timeSlot}>{parseTime(timer.hours)}</div>
            <div className={styles.divider}>:</div>
            <div className={styles.timeSlot}>{parseTime(timer.minutes)}</div>
            <div className={styles.divider}>:</div>
            <div className={styles.timeSlot}>{parseTime(timer.seconds)}</div>
        </div>
    )
}