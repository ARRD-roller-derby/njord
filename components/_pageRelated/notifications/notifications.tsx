import { PaginationProvider } from "../../pagination/pagination.provider"
import Factory from "../../_layouts/Factory/Factory"
import { useNotifications } from "./notifications.hook"
import { NotificationsResults } from "./notifications.types"
import { NotificationsView } from "./notifications.view"

const NotificationsFactory = Factory<unknown, NotificationsResults>(useNotifications, NotificationsView)

export const Notifications: React.FC = () => (
    <PaginationProvider>
        <NotificationsFactory />
    </PaginationProvider>
);
