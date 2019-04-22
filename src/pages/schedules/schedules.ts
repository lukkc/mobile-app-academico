import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Update } from '../../interfaces/Update';
import { EventEmitterService } from '../../emitters/EventEmitterService';

@IonicPage()
@Component({
    selector: 'page-schedules',
    templateUrl: 'schedules.html',
})
export class SchedulesPage implements Update {

    static title: string = "SchedulesPage";

    private _updateEventWatch: EventEmitter<any>;
    private _themeEvent: EventEmitter<any>;
    public theme: string;
    public dayWeek: string;
    public classesWeek = [];
    private _daysWeekEng: string[] = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];

    constructor(
        private _storage: Storage,
        private _params: NavParams
    ) {
        this._setTheme();
    }


    ionViewDidLoad() {
        this.changeTheme()
        this._classrooms();
        this._watchForUpdates();
    }


    ionViewWillEnter() {
        this._setDayWeek();
    }


    ionViewWillUnload() {
        this._unsubscribeThemeEvent();
        this._unsubscribeWatch();
    }


    private _setDayWeek(): void {
        let currentDay = new Date().getDay();

        if (currentDay)
            this.dayWeek = this._daysWeekEng[currentDay - 1];

        else
            this.dayWeek = "withoutClass";
    }


    _watchForUpdates(): void {
        this._updateEventWatch = EventEmitterService.getEvent("update").subscribe(() => {
            console.log("atualizando horario");
            this._classrooms();
        });
    }


    _unsubscribeWatch(): void {
        this._updateEventWatch.unsubscribe();
    }


    private _setTheme(): void {
        this.theme = this._params.data;
    }


    private changeTheme(): void {
        this._themeEvent = EventEmitterService.getEvent("theme").subscribe(theme => {
            this.theme = theme;
        });
    }


    private _unsubscribeThemeEvent(): void {
        this._themeEvent.unsubscribe()
    }


    public swipeSegment(event): void {

        let direction = event.offsetDirection;
        let directionRight = direction == 4;
        let directionLeft = direction == 2;
        let dayIndex = this._daysWeekEng.findIndex(day => day == this.dayWeek);

        if (directionLeft) {
            if (dayIndex >= 0 && dayIndex < 5)
                this.dayWeek = this._daysWeekEng[dayIndex + 1];

            if (dayIndex == 5)
                this.dayWeek = this._daysWeekEng[0];
        }

        if (directionRight) {
            if (dayIndex > 0 && dayIndex <= 5)
                this.dayWeek = this._daysWeekEng[dayIndex - 1];

            if (dayIndex == 0)
                this.dayWeek = this._daysWeekEng[5];
        }

    }


    private _classrooms(): void {
        this._storage.ready().then(() => {
            this._storage.get("user").then(user => {

                const subjects: any = user["cursos"][0]["periodo_atual"]["disciplinas"];
                let classesToday: any[] = [];
                const daysWeekPt: string[] = [
                    "segunda",
                    "terça",
                    "quarta",
                    "quinta",
                    "sexta",
                    "sábado"
                ];

                daysWeekPt.forEach(dayPt => {
                    let dayPtIndex = daysWeekPt.findIndex(day => day == dayPt);

                    let classDay: any = {
                        day: this._daysWeekEng[dayPtIndex],
                        classrooms: []
                    };

                    subjects.forEach(discipline => {
                        discipline["horarios"].forEach(schedule => {

                            const schedules: string[] = [];
                            const rooms: any = [];

                            if (schedule['dia'] == dayPt) {

                                schedule.sala.forEach(room => {

                                    if (room) {
                                        if (rooms.length) {
                                            rooms.forEach(currentRoom => {
                                                if (currentRoom != room) {
                                                    rooms.push(room);
                                                }
                                            });
                                        } else {
                                            rooms.push(room);
                                        }
                                    }
                                });

                                schedule.hora.forEach(hour => {
                                    if (schedules.length) {
                                        schedules.forEach((classTime, classTimeIndex) => {
                                            if (classTime.substring(0, 5) > hour.substring(0, 5)) {
                                                schedules[classTimeIndex] = `${hour.substring(0, 5)} - ${schedules[classTimeIndex].substring(8, 13)}`;
                                            }
                                            if (classTime.substring(8, 13) < hour.substring(8, 13)) {
                                                schedules[classTimeIndex] = `${schedules[classTimeIndex].substring(0, 5)} - ${hour.substring(8, 13)}`;
                                            }
                                        });
                                    } else {
                                        schedules.push(hour);
                                    }
                                });

                                classDay.classrooms.push({
                                    discipline: discipline.nome,
                                    teachers: discipline.professores,
                                    schedules: schedules,
                                    rooms: rooms
                                });
                            };
                        });
                    });

                    classDay.classrooms = this._sortClassesBySchedule(classDay.classrooms)
                    classesToday.push(classDay);

                });

                this.classesWeek = classesToday;

            }).catch(() => { return; });
        }).catch(() => { return; });
    }


    private _lowerHours(schedule): string {

        return schedule.reduce((previousSchedule, currentSchedule) => {

            if (previousSchedule < currentSchedule)
                return previousSchedule;

            return currentSchedule;
        });
    }


    private _sortClassesBySchedule(classesToday): any[] {

        return classesToday.sort((class1, class2) => {

            const class1Schedule: string = this._lowerHours(class1.schedules);
            const class2Schedule: string = this._lowerHours(class2.schedules);

            if (class1Schedule < class2Schedule)
                return -1;

            if (class1Schedule > class2Schedule)
                return 1;

            return 0;
        });
    }
}
