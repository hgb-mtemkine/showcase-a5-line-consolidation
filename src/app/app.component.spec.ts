import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LevensteinService } from './services/levenstein.service';

var sssA = "I like to eat";
var sssB = "I like to eat crayons";
var sssC = "I went to the beach with my girls";
var sssD = "I walked along the boardwalk today at 10 o'clock with my girls";
var sssE = "HEYZZ";
var sssF = "HAELLOY";


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
      sssC, 
      sssD).rogueIndicesB).toBe([3,34]);
  });
  it('#getValue should return real value', () => {
    expect(service.splitIntoRegions(
      sssC,
      sssD, 
      service.computeLevensteinDiff( 
        sssC, sssD).rogueIndicesB)[1]).toBe("alked along the boardwalk today at 10 o'clock");
  });
  it('#getValue should return real value', () => {
    expect("hello").toBe( "hello");
  });
  it('#getValue should return real value', () => {
    expect(service.splitIntoRegions(
      sssA, 
      sssB, 
      service.computeLevensteinDiff( sssA, sssB).rogueIndicesB)[1]).toBe("crayons");
  });
  it('#getValue should return real value', () => {
    expect(service.computeLevensteinDiff(
      sssE, 
      sssF).rogueIndicesB).toBe([1, 7]);
  });
  it('#getValue should return real value', () => {
    expect(service.splitIntoRegions(
      sssE, 
      sssF, 
      service.computeLevensteinDiff(sssE, sssF).rogueIndicesB)[0] + " " + service.splitIntoRegions(
        sssE, 
        sssF, 
        service.computeLevensteinDiff(sssE, sssF).rogueIndicesB)[1]
      ).toBe("H AELLOY");
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