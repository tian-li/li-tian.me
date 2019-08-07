export class Label {
  name: string;
  private color: string;
  private isDarkText: boolean;

  constructor(label: any) {
    this.name = label.name;
    this.color = `#${label.color}`;
    this.isDarkText = this.getIsDarkText(this.color);
  }

  getIsDarkText(labelColor: string): boolean {
    const color: string = (labelColor.charAt(0) === '#') ? labelColor.substring(1, 7) : labelColor;
    const r: number = parseInt(color.substring(0, 2), 16); // hexToR
    const g: number = parseInt(color.substring(2, 4), 16); // hexToG
    const b: number = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186);
  }

  get labelStyle() {
    return {
      'background-color': this.color,
      color: this.isDarkText ? 'black' : 'white'
    };
  }
}
