// import { AbsencePage } from '../pages/absence/absence';
// import { CoursePage } from '../pages/course/course';
// import { DetailedHistoryPage } from '../pages/detailed-history/detailed-history';
// import { DisciplineScorePage } from '../pages/discipline-score/discipline-score';
// import { HistoricPage } from '../pages/historic/historic';
// import { LoginPage } from '../pages/login/login';
// import { ProfilePage } from '../pages/profile/profile';
// import { RegisterPage } from '../pages/register/register';
// import { SchedulesPage } from '../pages/schedules/schedules';
// import { ScorePage } from '../pages/score/score';

export interface Pages {
    AbsencePage: boolean,
    CoursePage: boolean,
    DetailedHistoryPage?: boolean,
    DisciplineScorePage?: boolean,
    HistoricPage: boolean,
    LoginPage?: boolean,
    ProfilePage: boolean,
    RegisterPage?: boolean,
    SchedulesPage: boolean,
    ScorePage: boolean,
}