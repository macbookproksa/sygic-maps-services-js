import { expect } from 'chai';
import services from '../../src';

describe('routing', () => {

  let sygicServices = null;

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    });
  });

  describe('directions', () => {
    it('valid respone', (done) => {
      expect(() => {
        sygicServices.directions({
          origin: { lat: 48.13103840803432, lng: 17.113952636718754 },
          destination: { lat: 48.38544219115486, lng: 17.575378417968754 },
          speed_profiles: true,
          traffic: false,
          waypoints: [
            { lat: '48.28468', lng: 17.27055, isVia: false, stopTime: 0 }
          ],
          avoid: ['unpaved', 'ferries'],
          avoid_rectangles: [
            [
              { lat: 48.24936904607431, lng: 17.259521484375004 },
              { lat: 48.24936904607431, lng: 17.42294311523438 },
              { lat: 48.164711477297736, lng: 17.42294311523438 },
              { lat: 48.164711477297736, lng: '17.259521484375004' }
            ]
          ],
          avoid_countries: ['AUT'],
          vehicle_heading: 90,
          vehicle_type: 'car',
          route_computing: 'fastest',
          compute_alternatives: true,
          units: 'metric',
          max_speed: 200,
          departure_time: 1519113230,
          prefer_right_turn: false,
          dest_in_driving_side: false,
          total_weight: 1200,
          axle_weight: 1000,
          total_length: 5000,
          width: 3000,
          height: 2000,
          trailers: 1,
          vehicle_axles: 0,
          general_hazard: false,
          water_hazard: false,
          tunnel: 'b',
          steps: false,
          lang: 'svk'
        }, (error, response) => {
          expect(error).to.be.null;
          expect(response.data).to.not.be.null;
          expect(response.status).to.equal(200);
          expect(response.data.routes).to.be.not.empty;
          done();
        });
      }).to.not.throw();
    });
  });

  describe('matching', () => {
    it('valid respone', (done) => {
      sygicServices.matching({
        path: 'gjn~FrhdvOz~AvIbjBlc@v{BzcBdbCzqHrhAl{B'
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        done();
      });
    });
  });

  describe('roadinfo', () => {
    it('valid respone', (done) => {
      sygicServices.roadInfo({
        lat: '48.15021',
        lng: 17.12543,
        time: 0,
        vehicle_heading: 99
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        done();
      });
    });
  });

  describe('distanceMatrix', () => {
    it('valid respone', (done) => {
      sygicServices.distanceMatrix({
        origins: [
          { lat: 48.15544, lng: 17.10766 },
          { lat: 48.14306, lng: 17.12216 },
          { lat: 48.1577, lng: 17.16626 }
        ],
        destinations: [
          { lat: 48.16921, lng: 17.13893 },
          { lat: 48.18242, lng: 17.05485 },
          { lat: 48.12532, lng: 17.097 }
        ]
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        expect(response.data).to.be.not.empty;
        done();
      });
    });
  });

  describe('sendToNavi', () => {
    it('valid respone', (done) => {
      sygicServices.sendToNavi({
        message: 'Test',
        name: 'Test name',
        tags: 'id_test',
        directions_api_parameters: {
          origin: { lat: 48.13103840803432, lng: 17.113952636718754 },
          destination: { lat: 48.38544219115486, lng: 17.575378417968754 },
          speed_profiles: true,
          traffic: false,
          waypoints: [
            { lat: '48.28468', lng: 17.27055, isVia: false, stopTime: 0 }
          ],
          avoid: ['unpaved', 'ferries'],
          avoid_rectangles: [
            [
              { lat: 48.24936904607431, lng: 17.259521484375004 },
              { lat: 48.24936904607431, lng: 17.42294311523438 },
              { lat: 48.164711477297736, lng: 17.42294311523438 },
              { lat: 48.164711477297736, lng: '17.259521484375004' }
            ]
          ],
          avoid_countries: ['AUT'],
          vehicle_heading: 90,
          vehicle_type: 'car',
          route_computing: 'fastest',
          compute_alternatives: true,
          units: 'metric',
          max_speed: 200,
          departure_time: 1519113230,
          prefer_right_turn: false,
          dest_in_driving_side: false,
          total_weight: 1200,
          axle_weight: 1000,
          total_length: 5000,
          width: 3000,
          height: 2000,
          trailers: 1,
          vehicle_axles: 0,
          general_hazard: false,
          water_hazard: false,
          tunnel: 'b',
          steps: false,
          lang: 'svk'
        },
        directions_api_result: { route: '_rwdHeqmgBBeCn@BMzGA^CzFi@?GGKOAq@G[?c@L}IHmGDoD@u@@WHeHD_EFqDHsFPmKHwCVqRF{DBkCBsC@cA@KA{DGsBWiEc@kDw@eEOk@IWy@aCy@kBgAqBKUa@}@aDmFGIKOkEqG_E}FoBuCsAqBy@kAg@s@cG{I[e@Yc@c@m@kAeBeDyE_C_EsAcDcAeDkAqG[yCYyGQk[CeC?sAGeOEiJEmKIqSIuLY{Hg@sF[uB_BsHeAgD{AqDo@mAcD{EiCkCiDcCaBw@m@WcD{@}De@oAKaAKGAgJs@iBMgE[{AMm@EkDWwXwBwCW}@K]EmAMwC]KAuFy@a@G{JkBuG_Bu@Q_EgA{KoDmHoCiHcDyF}CqEqCgI}FeK}I{@{@mF{FEEOOuHgJoCuDcF_Ia@q@Ka@sCeFe@kBQwAEqEEq@[qAg@q@_@WQG_ABaBv@UR_BdAgBlAmBx@aARqDh@oFt@YBuJtAu@Nm@HsI|A}@PkTbDsFbAy@N{@?SIOFG`@k@d@gBbAcAd@WJcAb@eBj@}Dr@yDRoB?sHi@kCa@oAc@wB{A_A_AGUo@q@oAsAa@_@_@O]?c@N}@bAIZy@hAkAlBaCtD]z@YhBy@zCyC|GcG|Im@x@{ClDeBxAo@f@s@bAc@n@_AvAo@|@a@j@cBdCaDhG_@z@uAnEg@dBIX_AxDcBvG_@bAe@xAs@fAi@`AaAbB[ZMPYPUHk@Gc@m@cDsLScAyAuIk@}BwBaHsK}[cDgGi@o@mEoG_@m@iCmDqQmVaJuKqI{KcB{Ag@e@gCoAwD{@uAO{C?_CDiDCiBUoAc@cCmAqAgAyEcGQSMOoCkDg@m@a@e@e@i@e@g@aGoGoBqBmHsHa@c@YYqBoCm@{@SWkBgCgEgDY[cBaBeAyAwBoDiCaF}@eBg@{@e@cA_AmCq@oBUeAa@iB[sASeAkAiHyAsIwDuTqAsGaBiF{AsDcCuEeB}B}A}AmAcAyEqC}@e@eEgAaBYuJcA[EmDaB}AoAgAoAsBqDiAuCCGYmAOs@eA_HO_AOwAa@wDIeAIeAGaAGaAMyCu@cGOe@q@gBuCgFuDyF}G_MGI_@k@uD_E_BgBWKOOUUo@i@o@k@eAkA}BkCk@o@y@aAMMMQOOqC_Dq@y@aAgA_@c@]SC]KKO?u@aAg@k@mAwAk@o@[[c@i@a@g@o@u@aAeAeAmASS_AiA_BcCsA}CEMc@uAsA{EqAeHs@gEEQQiAKm@COMyF?YCo@Ea@_AuDEUsAb@u@VW{CVzCt@WrAc@oBaGk@aB]aAGKq@qAa@c@u@[e@Qq@YiDwAS[S}@Ke@i@aCo@uCKa@Om@Mo@S_AGUWaASu@Qm@_@gBeA{EO]o@aBiBwBiA{@u@_@_@QeASeBGaAA{CNEQIEMVeCNsCEiEKaR[}GKgAGkAM{Dk@uCqAkCaBa@[kEoDY[_@i@{IkPaCaGs@aBe@kAOa@oD{I[y@M[}B}Fe@oAmB}CoAiAyCuBs@k@cCiB_@YyAgAoCkB]YMIc@YkBu@}EaAi@KeASKCuEy@gHqAg@ImB]uHuA{Bq@sDsB_PwLIGgDgCkBsAq@e@c@UmBeAcDgBcBeA_Bm@e@EsAOcFm@wDe@QCQCu@BmAFkBDs@@YW{A_Da@}@IOoBkEMYqAaHe@kCWmAk@uAKq@Ew@Ym@}DtAq@Fa@DaBRkBTcBPkANYAk@GsBQ[C[EqAQ]MWOm@o@e@mAUkBMmDOcAY_Ak@eA{@}@aA[gBIeAg@g@Q[?sBlAe@N_@@UGqBoAuDwCKIe@g@QU]iAkAkG_@sA_@_AKSYcAK{@TkBZoCZqCTwBPmBx@kJf@mFp@wHhBkSRuF^_MTuHj@gSXeH`@kFTcBp@oC~CqG`@mAX{AFmAiCusASkNa@}Qy@ie@CoAEuBs@__@E{By@gIq@yB{AuDmAyDcOwq@_GqLy@sAiCqFuCiImGiScGuNiCmKiCkHYgAAgFc@oEc@uCOcCAc@DcCZiC^_BLWpAgArDoAj@Yl@q@l@kBb@aFd@oFHkA?g@A{BK{AEa@mA{KQ{BKoBAkK@uAIaAwAoE{CkIyAiKaO{jAkGowBKcEq@}Hg@gDw@yDyAeFsDcIcB_CSWqB_DmVq]}OkUwO{VqEeHmAoBaCaEa@}@U_BKiDGaBAs@Cy@IqBCkCVsBh@}AnJuQ~AsCpMoU^y@Hc@Co@eAiCgAmCQeBMeDSkGKwBi@gJQaDWcF[iEY}AoKcb@m@eCKi@]qCYqLw@eYCoEj@_HBcDQcCqBuKKo@k@}Cy@sEo@wEe@iDc@aEWmCy@sHi@eDo@qBmCkGgOq]k@gB_@kB_@mDwDkoAM}Di@oQKsCSwGa@uNIuA_AiHcBuLGk@Ig@Kw@u@yFoAuIG]K{@a@wCCmABa@PYpAIf@DpEDvE@eA_HrCkDzA_CYk@}CoJiByFEMc@uAAYaBvBEPe@p@c@h@g@r@{HpJi@d@' }
      }, (error, response) => {
        expect(error).to.be.null;
        expect(response.status).to.equal(200);
        done();
      });
    });
  });

});