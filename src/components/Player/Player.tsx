import styles from './player.module.scss';

import { Slider } from '@material-ui/core';
import { PlayCircleFilled, SkipPrevious, SkipNext, Shuffle, Repeat } from '@material-ui/icons';

export default function Player() {
    return (
        <div className={styles.player}>
            <header>
                <strong>Tocando agora</strong>
            </header>
            <div className={styles.emptyPlayer}>
                <strong>Selecione</strong>
            </div>
            <footer className={styles.empty}>
                <div className={styles.playerButttons}>
                    <div className={styles.actions}>
                        <Shuffle className={styles.btnAction}></Shuffle>
                        <SkipPrevious className={styles.btnAction} fontSize="large"></SkipPrevious>
                        <PlayCircleFilled className={`${styles.play} ${styles.btnAction}`} fontSize="large"></PlayCircleFilled>
                        <SkipNext className={styles.btnAction} fontSize="large"></SkipNext>
                        <Repeat className={styles.btnAction} ></Repeat>
                    </div>
                    <div className={styles.songBar}>
                        <div>0:00</div>
                        <Slider className={styles.progressBar}/>
                        <div>0:00</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
