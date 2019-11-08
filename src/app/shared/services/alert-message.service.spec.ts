import {AlertMessageService} from './alert-message.service';
import {EventEmitterService} from './event-emitter.service';
import {async, TestBed} from '@angular/core/testing';
import {AlertMessageComponent} from '../components/alert-message/alert-message.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from '../../app.component';
import {SharedModule} from '../modules/shared.module';

describe('ValueService', () => {
  let service: AlertMessageService;
  let alertComponent: AlertMessageComponent;
  let alertViewObj;
  let eventEmitterSpy: jasmine.SpyObj<EventEmitterService>;
  beforeEach(async(() => {
      const eventEmitterAlertMesgageSpy =
        jasmine.createSpyObj('EventEmitterService', ['alertMessage']);
      TestBed.configureTestingModule({
        imports: [
          SharedModule
        ],
        declarations: [
        ],
        providers: [ AlertMessageService,
          { provide: EventEmitterService, useValue: eventEmitterAlertMesgageSpy }
          ]
      }).compileComponents();
      eventEmitterSpy = TestBed.get(EventEmitterService);
      service = new AlertMessageService(eventEmitterSpy);
      alertComponent=new AlertMessageComponent(eventEmitterSpy);
      alertComponent.ngOnInit();
      const alertMessageComponentComponentFixture = TestBed.createComponent(AlertMessageComponent);
      alertMessageComponentComponentFixture.detectChanges();
      alertViewObj = alertMessageComponentComponentFixture.nativeElement;

    }
    )
  );


  // it('Should show an alert success message title(success) and message (success).', () => {
  //
  //   service.success('success', 'success');
  //  // expect(eventEmitterSpy.alertMessage.emit).toHaveBeenCalledWith({type: 'success', title: 'success', message: 'success'});
  //   //expect(alertViewObj.querySelector('strong').textContent).toEqual('success');
  //
  //       //console.log(alertBody);
  //       //expect(alertBody).toEqual({type: 'success', title: 'success', message: 'success'});
  //       // expect(alertViewObj.querySelector('strong').textContent).toEqual('success');
  //       // expect(alertViewObj.querySelector('div').textContent).toEqual('success');
  //
  //
  // });
  // it('Should show an alert fail message title(danger) and message (danger).', () => {
  //   service.fail('danger', 'danger');
  //
  //      // expect('alertBody').toEqual({type: 'danger', title: 'danger', message: 'danger'});
  //
  // });
  // it('Should show an alert success message title(warning) and message (warning).', () => {
  //   service.warn('warning', 'warning');
  //
  //      // expect(alertBody).toEqual({type: 'warning', title: 'warning', message: 'warning'});
  //
  // });
  // it('Should show an alert info message title(info) and message (info).', () => {
  //   service.info('info', 'info');
  //
  //       //expect(alertBody).toEqual({type: 'info', title: 'info', message: 'info'});
  //
  // });

});
