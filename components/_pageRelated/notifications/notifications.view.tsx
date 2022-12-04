import NotificationMiniCard from '../../Notification/NotificationMiniCard/NotificationMiniCard'
import ShortAction from '../../Notification/ShortAction/ShortAction'
import Pagination from '../../pagination/pagination'
import RequestMiniCard from '../../Requests/RequestMiniCard/RequestMiniCard'
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import classes from './notifications.module.css'
import { NotificationsResults } from './notifications.types'


export const NotificationsView: React.FC<NotificationsResults> = ({
    loading,
    notifications,
    reSync,
    requests,
}) => {
    return (
        <AuthentificatedLayout>
            <div className={classes.container}>
                {notifications && notifications.length > 0 && (
                    <div className={classes.actions}>
                        <div className={classes.action}>
                            <ShortAction
                                text="Marquer tout comme lu"
                                reSync={reSync}
                                url="notifications/markAllRead"
                            />
                        </div>
                        <div className={classes.action}>
                            <ShortAction
                                text="tout supprimer"
                                reSync={reSync}
                                url="notifications/deleteAll"
                            />
                        </div>
                    </div>
                )}
                <div className={classes.box}>
                    {requests &&
                        requests.map((request) => (
                            <RequestMiniCard
                                key={request._id}
                                request={request}
                                reSync={reSync}
                            />
                        ))}
                    {notifications &&
                        notifications.map((notification) => (
                            <NotificationMiniCard
                                key={notification._id}
                                notification={notification}
                                reSync={reSync}
                            />
                        ))}
                    {loading && (
                        <div className={classes.loading}>
                            <LoaderWheel />
                        </div>
                    )}
                    {!loading && notifications?.length + requests?.length === 0 && (
                        <div className={classes.noResult}>Aucune notification</div>
                    )}
                </div>
                <Pagination />
            </div>
        </AuthentificatedLayout>
    )
}
