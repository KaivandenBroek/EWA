import {Component, OnInit} from '@angular/core';
import {TagService} from '../services';

@Component({
  selector: 'app-client-suggestions-internet',
  templateUrl: './client-suggestions-internet.component.html',
  styleUrls: ['./client-suggestions-internet.component.css']
})
export class ClientSuggestionsInternetComponent implements OnInit {

  /**
   * Constructor with the parameter:
   * @param tagService
   */
  constructor(private tagService: TagService) {
  }

  // Variabelen
  private WD: number;
  private IVD: number;
  private WDTraag: number;
  private WDNiet: number;
  private IVDTraag: number;
  private IVDNiet: number;

  // Wifi-draadloos
  /**
   * the WiDraFunction() method is a get mehtode that displays a number variable in the console log.
   * it also retrieves the tag ID from the database. The variable is in fact the same as the tagID attribute in the database.
   * As a result, the program knows exactly which tag it is.
   * @WiDraFunction()
   */
  WiDraFunction() {
    this.WD = 11;
    console.log(this.WD);
    this.tagService.tag2(this.WD);
  }

  // Wifi-traag
  /**
   * the WiTraagFunction() method is a get mehtode that displays a number variable in the console log.
   * it also retrieves the tag ID from the database. The variable is in fact the same as the tagID attribute in the database.
   * As a result, the program knows exactly which tag it is.
   * @WiTraagFunction()
   */
  WiTraagFunction() {
    this.WDTraag = 112;
    console.log(this.WDTraag);
    this.tagService.tag3(this.WDTraag);
  }

  // Wifi-doet-het-niet
  /**
   * the WiNietFunction() method is a get mehtode that displays a number variable in the console log.
   * it also retrieves the tag ID from the database. The variable is in fact the same as the tagID attribute in the database.
   * As a result, the program knows exactly which tag it is.
   * @WiNietFunction()
   */
  WiNietFunction() {
    this.WDNiet = 113;
    console.log(this.WDNiet);
    this.tagService.tag3(this.WDNiet);
  }

  // Internet via Draad/Kabel
  /**
   * the IVDFunction() method is a get mehtode that displays a number variable in the console log.
   * it also retrieves the tag ID from the database. The variable is in fact the same as the tagID attribute in the database.
   * As a result, the program knows exactly which tag it is.
   * @IVDFunction()
   */
  IVDFunction() {
    this.IVD = 12;
    console.log(this.IVD);
    this.tagService.tag2(this.IVD);
  }

  // Trage kabel verbinding
  /**
   * the IVDTraagFunction() method is a get mehtode that displays a number variable in the console log.
   * it also retrieves the tag ID from the database. The variable is in fact the same as the tagID attribute in the database.
   * As a result, the program knows exactly which tag it is.
   * @IVDTraagFunction()
   */
  IVDTraagFunction() {
    this.IVDTraag = 121;
    console.log(this.IVDTraag);
    this.tagService.tag3(this.IVDTraag);
  }

  // Geen kabel verbinding
  /**
   * the IVDNietFunction() method is a get mehtode that displays a number variable in the console log.
   * it also retrieves the tag ID from the database. The variable is in fact the same as the tagID attribute in the database.
   * As a result, the program knows exactly which tag it is.
   * @IVDNietFunction()
   */
  IVDNietFunction() {
    this.IVDNiet = 122;
    console.log(this.IVDNiet);
    this.tagService.tag3(this.IVDNiet);
  }

  // Getter
  public getWD() {
    return this.WD;
  }

  // Getter
  public getWDTraag() {
    return this.WDTraag;
  }

  // Getter
  public getWDNiet() {
    return this.WDNiet;
  }

  // Getter
  public getIVD() {
    return this.IVD;
  }

  // Getter
  public getIVDTRaag() {
    return this.IVDTraag;
  }

  // Getter
  public getIVDNiet() {
    return this.IVDNiet;
  }

  ngOnInit() {
  }
}
