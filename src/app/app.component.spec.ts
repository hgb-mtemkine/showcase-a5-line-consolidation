import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LevensteinService } from 'app/levenstein.service';

var sssA = "I like to eat";
var sssB = "I like to eat crayons";


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
});

// Straight Jasmine testing without Angular's testing support
describe('LevensteinService', () => {
  let service: LevensteinService;
  beforeEach(() => { service = new LevensteinService(); });

  it('#getValue should return real value', () => {
    expect(service.computeLevensteinDiff(
      'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm', 
      'flight --from miami --date feb 13th --cool beans are great --to quito --time-depart 3:35 pm').rogueIndicesB).toBe([39,50,51,52,53,49]);
  });
  it('#getValue should return real value', () => {
    expect("hello").toBe( "hello");
  });
  it('#getValue should return real value', () => {
    expect(service.splitIntoRegions(
      sssA, 
      sssB, 
      service.computeLevensteinDiff( sssA, sssB).rogueIndicesB, 29 )[1]).toBe("crayons");
  });
  it('#getValue should return real value', () => {
    expect(service.splitIntoRegions(
      'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm', 
      'flight --from miami --date feb 13th --cool beans are great --to quito --time-depart 3:35 pm', 
      service.computeLevensteinDiff( 
        'flight --from miami --date feb 13th --to quito --time-depart 3:35 pm', 
        'flight --from miami --date feb 13th --cool beans are great --to quito --time-depart 3:35 pm').rogueIndicesB, 19)[1]).toBe("cool beans are great");
  });
  
/**
 * 
 *  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
    service.getObservableValue().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });

  it('#getPromiseValue should return value from a promise',
    (done: DoneFn) => {
    service.getPromiseValue().then(value => {
      expect(value).toBe('promise value');
      done();
    });
  });
  [ 14, 15, 16, 17, 18, 19, 20, 21 ]
  [ 14, 15, 16, 17, 18, 19, 20, 21 ]
 */
 
});