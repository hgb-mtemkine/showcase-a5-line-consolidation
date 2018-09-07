import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class LevensteinService {

  computeLevensteinDiff(a: string, b: string): LevensteinResult {
    let na: number = a.length;
    let nb: number = b.length;
    let d: number[][] = _.times(na + 1, x => _.times(nb + 1, x => 0));

    // Step 1
    if (na == 0)
      return <LevensteinResult> {
        steps: nb,
        rogueIndicesA: [],
        rogueIndicesB: _.times(nb, x => x),
      };
    if (nb == 0)
      return <LevensteinResult> {
        steps: na,
        rogueIndicesA: _.times(na, x => x),
        rogueIndicesB: [],
      };

    // Step 2
    for (let i = 0; i <= na; d[i][0] = i++) {}
    for (let j = 0; j <= nb; d[0][j] = j++) {}
    
    //  Step 3
    for (let i: number = 1; i <= na; i++) {
        // Step 4
        for (let j: number = 1; j <= nb; j++) {
          //  Step 5
            if (b.charAt(j-1) === a.charAt(i-1)){
              d[i][j] = d[i-1][j-1];
            }//  Step 6
            else {
              d[i][j] = Math.min(
                d[i - 1][j] + 1,
                d[i][j - 1] + 1,
                d[i - 1][j - 1] + 1 
              );}
        }
    }
    //  Step 7 - crawl the matrix back to determine rogue indices
    let rogueIndicesA = [];
    let rogueIndicesB = [];
    let iii = na;
    let jjj = nb;
    //console.log("iii: " + iii + " jjj: " + jjj);

    while(iii > 0 || jjj > 0) {
      //console.log(`${iii}, ${jjj}`);
      //console.log(rogueIndicesB);

      if (iii > 0 && jjj > 0) {
        let minBacktrack = Math.min(
          d[iii - 1][jjj], //deletion
          d[iii][jjj - 1], //insertion
          d[iii - 1][jjj - 1] //substitution
        );
        console.log(minBacktrack);
        if (minBacktrack == d[iii][jjj]) {
          iii--;
          jjj--;
          console.log("noop");
          continue;
        }
        if (minBacktrack == d[iii][jjj - 1] && minBacktrack == d[iii][jjj]) {
          console.log("minBacktrack: " + minBacktrack + " d[iii][jjj-1] && d[iii][jjj]: " + [iii,jjj]);
          //rogueIndicesB.push(jjj);
          iii--;
          jjj--;
          continue;
        }
        if (minBacktrack == d[iii][jjj - 1]) {
          console.log("minBacktrack: " + minBacktrack + " d[iii][jjj-1]: " + [iii,jjj]);
          rogueIndicesB.push(jjj);
          jjj--;
          continue;
        }
        if (minBacktrack == d[iii - 1][jjj]) {
          console.log("minBacktrack: " + minBacktrack + " d[iii-1][jjj]: " + [iii,jjj]);
          rogueIndicesA.push(iii);
          iii--;
          continue;
        }
        //console.log(minBacktrack);
        rogueIndicesA.push(iii);
        rogueIndicesB.push(jjj);
        iii--;
        jjj--;
      }
      else if (iii > 0) {
        rogueIndicesA.push(iii);
        iii--;
      }
      else if (jjj > 0) {
        rogueIndicesB.push(jjj);
        jjj--;
      }
    }
    //console.log(rogueIndicesB);
    console.log(d);

    //  Step 8
    return <LevensteinResult> {
      steps: d[na][nb],
      rogueIndicesA: _.sortBy(rogueIndicesA, x => x),
      rogueIndicesB: _.sortBy(rogueIndicesB, x => x),
    };
  }

  stringToFragments(sss: string, charIndices: number[]): LevensteinStringFragment[] {
    let fragments = [];
    var lastStart = 0;
    for (let i = 0; i < charIndices.length; i++) {
      const cIndex = charIndices[i];
      if (lastStart < cIndex)
        fragments.push(<LevensteinStringFragment> {
          text: sss.substring(lastStart, cIndex),
          isRogue: false,
          sourceIndex: -1,
        });
      fragments.push(<LevensteinStringFragment> {
        text: sss.substring(cIndex, cIndex+1),
        isRogue: true,
        sourceIndex: i,
      });
      lastStart = cIndex + 1;
    }
    if (lastStart < sss.length)
      fragments.push(<LevensteinStringFragment> {
        text: sss.substring(lastStart, sss.length),
        isRogue: false,
        sourceIndex: -1,
      });
    return fragments;
  }

  stringWithRegionsToFragments(sss: string, regions: LevRegion[], offset:number = 0): LevensteinStringFragment[] {
    let fragments = [];
    var lastStart = 0;
    for (let i = 0; i < regions.length; i++) {
      const region = regions[i];
      if (lastStart < region.start - offset)
        fragments.push(<LevensteinStringFragment> {
          text: sss.substring(lastStart, region.start - offset),
          isRogue: false,
          sourceIndex: -1,
        });
      else {
        fragments.push(<LevensteinStringFragment> {
          text: sss.substring(region.start - offset, region.start + region.span - offset),
          isRogue: true,
          sourceIndex: i,
        });
      }
      lastStart = region.start + region.span - offset;
    }
    if (lastStart < sss.length)
      fragments.push(<LevensteinStringFragment> {
        text: sss.substring(lastStart, sss.length),
        isRogue: false,
        sourceIndex: -1,
      });
    return fragments;
  }

  splitIntoRegions(sssA: string, sssB: string, tokens: number[]): string[]{
    if (tokens[0] > sssA.length ) {
      let lineC = sssB.substring(tokens[0], tokens[tokens.length - 1]);
      return [sssA, lineC, ""];

    } else {
      let lineA = sssB.substring(0, tokens[0]-1);
      let lineB = sssB.substring(tokens[tokens.length-1], (sssB.length));
      let lineC = sssB.substring(tokens[0]-1, tokens[tokens.length-1]);
      //console.log(lineC);
     // console.log(tokens);
      return [lineA, lineC, lineB];
    }

  }

}

export class LevensteinResult {
  steps: number;
  rogueIndicesA: number[];
  rogueIndicesB: number[];
}

export class LevensteinStringFragment {
  text: string;
  isRogue: boolean;
  sourceIndex: number;
}

export class LevRegion {
  start: number;
  span: number;
}
