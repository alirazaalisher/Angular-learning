import { of, Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { resolve } from "url";
import { Injectable } from "@angular/core";
import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";

@Injectable({
  providedIn: "root",
})
export class PromotionService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + "promotions");
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + "promotions" + id);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http
      .get<Promotion>(baseURL + "promotions?featured=true")
      .pipe(map((promotions) => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
