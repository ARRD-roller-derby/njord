import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated';
import Calendar from '../../_ui/Calendar/Calendar';
import useCalendar from './useCalendar';

export default function CalendarView(){
  const props = useCalendar();
  return <AuthentificatedLayout>
    <Calendar {...props}/>
  </AuthentificatedLayout>
}