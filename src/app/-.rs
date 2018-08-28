let sssA = "aaa";
let sssB = "aaabbb";
let levensteinData = this.levService.computeLevensteinDiff(sssA, sssB);
let fragments = this.levService.stringToFragments(sssB, levensteinData.rogueIndicesB);