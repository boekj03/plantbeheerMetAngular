export class MaandenSort {
  private static MAANDLIJST: Array<string> = ['JANUARI', 'FEBRUARI', 'MAART', 'APRIL','MEI', 'JUNI','JULI','AUGUSTUS', 'SEPTEMBER','OKTOBER','  NOVEMBER','DECEMBER' ];

  public static sorteerMaanden(input: Array<string>) :Array<string> {
    const sortedArray: string[] = input.sort((string1, string2) => {

      const possitie1 = MaandenSort.MAANDLIJST.indexOf(string1);
      const possitie2 = MaandenSort.MAANDLIJST.indexOf(string2);

      if (possitie1 > possitie2) {
        return 1;
      }
      if (possitie1 < possitie2) {
        return -1;
      }
      return 0;
    });
    return sortedArray;
  }
}
