import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './header.module.scss';

export default function Header() {
    const date = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    })

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>
                Hello
            </h1>
            <p className={styles.description}>
                Hello friends form the internet
            </p>
            <p className={styles.date}>
                {date}
            </p>
        </div>
    )
}
