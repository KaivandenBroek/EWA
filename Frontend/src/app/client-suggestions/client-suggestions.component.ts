import {Component, OnInit} from '@angular/core';
import {TagService} from '../services';

@Component({
  selector: 'app-client-suggestions',
  templateUrl: './client-suggestions.component.html',
  styleUrls: ['./client-suggestions.component.css']
})
export class ClientSuggestionsComponent implements OnInit {

  /**
   * Constructor with the parameter:
   * @param tagService
   */
  constructor(
    private tagService: TagService) {
  }

  // Variabelen
  private MO: string;
  private IN: number;
  private ITV: number;
  private VT: number;

  // Mobiel
  /**
   * the moFunction() method is a get mehtode that displays a string variable in the console log
   * @MOFunction()
   */
  MOFunction() {
    this.MO = 'Mobiel';
    console.log(this.MO);
  }

  // Internet
  /**
   * the INFunction() method is a get mehtode that displays a number variable in the console log.
   * it also retrieves the tag ID from the database. The variable is in fact the same as the tagID attribute in the database.
   * As a result, the program knows exactly which tag it is.
   * @INFunction()
   */
  INFunction() {
    this.IN = 1;
    console.log(this.IN);
    this.tagService.tag1(this.IN);
  }

  // Interactive-Tv
  /**
   * the ITVFunction() method is a get mehtode that displays a number variable in the console log.
   * it also retrieves the tag ID from the database. The variable is in fact the same as the tagID attribute in the database.
   * As a result, the program knows exactly which tag it is.
   * @ITVFunction()
   */
  ITVFunction() {
    this.ITV = 2;
    console.log(this.ITV);
    // this.tagService.tag1(this.ITV);

  }

  // Vaste Telefonie
  /**
   * the VTFunction() method is a get mehtode that displays a number variable in the console log.
   * it also retrieves the tag ID from the database. The variable is in fact the same as the tagID attribute in the database.
   * As a result, the program knows exactly which tag it is.
   * @VTFunction()
   */
  VTFunction() {
    this.VT = 3;
    console.log(this.VT);
    // this.tagService.tag1(this.VT);
  }

  ngOnInit() {

  }

}
