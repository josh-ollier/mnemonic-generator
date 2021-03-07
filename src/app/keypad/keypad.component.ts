import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "max-length-snackbar",
  templateUrl: "./max-length-snackbar.html",
  styleUrls: ["./keypad.component.scss"],
})
export class MaxLengthSnackBarComponent {}

@Component({
  selector: "no-entry-snackbar",
  templateUrl: "./no-entry-snackbar.html",
  styleUrls: ["./keypad.component.scss"],
})
export class NoEntrySnackBarComponent {}

@Component({
  selector: "app-keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: ["./keypad.component.scss"],
})
export class KeypadComponent {
  mainText = "";
  output: string;
  showPopup = false;
  snackbarDuration = 5;

  constructor(private snackBar: MatSnackBar) {}

  pressKey(key: string) {
    if (this.mainText.length === 6) {
      this.snackBar.openFromComponent(MaxLengthSnackBarComponent, {
        duration: this.snackbarDuration * 1000,
      });
      return;
    }
    this.mainText += key;
  }

  allClear() {
    this.mainText = "";
    this.displayedResults = [];
  }

  displayedResults = [];

  generateMnemonic(phoneNumber: string) {
    var numCharPairings = {
      0: ["0"],
      1: ["1"],
      2: ["a", "b", "c"],
      3: ["d", "e", "f"],
      4: ["g", "h", "i"],
      5: ["j", "k", "l"],
      6: ["m", "n", "o"],
      7: ["p", "q", "r", "s"],
      8: ["t", "u", "v"],
      9: ["w", "x", "y", "z"],
    };

    const output = [];

    if (!phoneNumber.length) {
      this.snackBar.openFromComponent(NoEntrySnackBarComponent, {
        duration: this.snackbarDuration * 1000,
      });
      return;
    } else {
      var createMnemonic = function (x, numPos) {
        if (x.length !== phoneNumber.length) {
          var convertInput = function (i) {
            createMnemonic(x + i, numPos + 1);
          };
          numCharPairings[phoneNumber[numPos]].forEach(convertInput);
        } else {
          x = " " + x + " ";
          output.push(x);
          return;
        }
      };
      createMnemonic("", 0);
      this.showPopup = true;
      this.displayedResults = output;
      return output;
    }
  }
}
