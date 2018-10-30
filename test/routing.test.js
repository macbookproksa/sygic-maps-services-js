import { expect } from 'chai'
import { directions, routeMatching, roadInfo, distanceMatrix, sendToNavi } from '../src/api/routing'
import * as services from '../src/index'

describe('routing', () => {

  let sygicServices = null

  before(() => {
    sygicServices = services.create({
      key: process.env.API_KEY
    })
  })

  describe('directions', () => {
    it('should return a valid query', function () {
      expect(
        directions.validator({
          origin: { lat: '48.11028597523363', lng: -17.12724566459656 },
          destination: { lat: 48.28490634600474, lng: '17.73373603820801' },
          speed_profiles: true,
          traffic: false,
          waypoints: [
            { lat: '48.21094727794912', lng: '17.25565910339356' },
            { lat: -48.21462203499331, lng: 17.38444805145264, isVia: false },
            { lat: 48.2050556774789, lng: 17.418479919433597, stopTime: 600 },
            { lat: 48.202123924724624, lng: 17.528600692749027, isVia: true, stopTime: 0 },
            { lat: 48.241824189703564, lng: -17.697687149047855, isVia: false, stopTime: 600 }
          ],
          avoid: ['cze:unpaved', 'ferries', 'deu:country'],
          avoid_rectangles: [
            [
              { lat: '48.148564905217164', lng: 17.156181335449222 },
              { lat: -48.12702823764068, lng: 17.156181335449222 }
            ],
            [
              { lat: -48.16116195751926, lng: 17.165279388427738 },
              { lat: 48.16116195751926, lng: 17.19995498657227 },
              { lat: '48.15028286718964', lng: 17.19995498657227 },
              { lat: 48.15028286718964, lng: -17.165279388427738 }]
          ],
          avoid_countries: ['ger', 'hun'],
          vehicle_heading: 90,
          vehicle_type: 'truck',
          route_computing: 'fastest',
          compute_alternatives: false,
          units: 'metric',
          max_speed: 130,
          departure_time: 1000,
          prefer_right_turn: false,
          dest_in_driving_side: false,
          total_weight: 12000,
          axle_weight: 1000,
          total_length: 12,
          width: 10,
          height: 4,
          trailers: 6,
          vehicle_axles: 6,
          trailer_axles: 6,
          height_at_first_axle: 2000,
          general_hazard: false,
          water_hazard: false,
          emission_class: 'euro4',
          tunnel: 'b',
          steps: true,
          lang: 'usa'
        })
      ).to.deep.equal({
        origin: '48.11028597523363,-17.12724566459656',
        destination: '48.28490634600474,17.73373603820801',
        speed_profiles: true,
        waypoints: '48.21094727794912,17.25565910339356,0|-48.21462203499331,17.38444805145264,0|48.2050556774789,17.418479919433597,600|via:48.202123924724624,17.528600692749027,0|48.241824189703564,-17.697687149047855,600',
        avoid: 'cze:unpaved|ferries|deu:country',
        avoid_rectangles: '48.148564905217164,17.156181335449222|-48.12702823764068,17.156181335449222;-48.16116195751926,17.165279388427738|48.16116195751926,17.19995498657227|48.15028286718964,17.19995498657227|48.15028286718964,-17.165279388427738',
        avoid_countries: 'ger|hun',
        vehicle_heading: 90,
        vehicle_type: 'truck',
        route_computing: 'fastest',
        units: 'metric',
        max_speed: 130,
        departure_time: 1000,
        total_weight: 12000,
        axle_weight: 1000,
        total_length: 12,
        width: 10,
        height: 4,
        trailers: 6,
        vehicle_axles: 6,
        trailer_axles: 6,
        height_at_first_axle: 2000,
        emission_class: 'euro4',
        tunnel: 'b',
        steps: true,
        lang: 'usa'
      })
    })

    it('should return a valid respone', (done) => {
      expect(() => {
        sygicServices.directions({
          origin: { lat: '48.11028597523363', lng: 17.12724566459656 },
          destination: { lat: 48.28490634600474, lng: '17.73373603820801' },
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
          vehicle_type: 'truck',
          route_computing: 'fastest',
          compute_alternatives: true,
          units: 'metric',
          max_speed: 200,
          prefer_right_turn: false,
          dest_in_driving_side: false,
          axle_weight: 500,
          total_length: 4000,
          width: 2000,
          height: 1500,
          tunnel: 'b',
          steps: false,
          lang: 'svk',
          total_weight: 8000,
          trailers: 1,
          vehicle_axles: 2,
          trailer_axles: 1,
          water_hazard: false,
          general_hazard: false,
          emission_class: 'euro4',
          height_at_first_axle: 300,
          departure_time: 1464691627
        }, (error, response) => {
          expect(error).to.be.null
          expect(response.data).to.not.be.null
          expect(response.status).to.equal(200)
          expect(response.data.routes).to.be.not.empty
          done()
        })
      }).to.not.throw()
    })
  })

  describe('matching', () => {
    it('should return a valid query', function () {
      expect(
        routeMatching.validator({
          path: 'gjn~FrhdvOz~AvIbjBlc@v{BzcBdbCzqHrhAl{B',
          waypoint_indexes: 'index'
        })
      ).to.deep.equal({
        path: 'gjn~FrhdvOz~AvIbjBlc@v{BzcBdbCzqHrhAl{B',
        waypoint_indexes: 'index'
      })
    })

    it('should return a valid respone', (done) => {
      sygicServices.routeMatching({
        path: 'gjn~FrhdvOz~AvIbjBlc@v{BzcBdbCzqHrhAl{B'
      }, (error, response) => {
        expect(error).to.be.null
        expect(response.status).to.equal(200)
        expect(response.data).to.be.not.empty
        done()
      })
    })
  })

  describe('roadinfo', () => {
    it('should return a valid query', function () {
      expect(
        roadInfo.validator({
          lat: '-48.15021',
          lng: 17.12543,
          time: 1000,
          vehicle_heading: 100
        })
      ).to.deep.equal({
        lat: -48.15021,
        lng: 17.12543,
        time: 1000,
        vehicle_heading: 100
      })
    })

    it('should return a valid respone', (done) => {
      sygicServices.roadInfo({
        lat: '48.15021',
        lng: 17.12543,
        time: Math.floor(Date.now() / 1000),
        vehicle_heading: 99
      }, (error, response) => {
        expect(error).to.be.null
        expect(response.status).to.equal(200)
        expect(response.data).to.be.not.empty
        done()
      })
    })
  })

  describe('distanceMatrix', () => {
    it('should return a valid query', function () {
      expect(
        distanceMatrix.validator({
          origins: [
            { lat: '48.15544', lng: 17.10766 },
            { lat: 48.14306, lng: '-17.12216' },
            { lat: -48.1577, lng: 17.16626 }
          ],
          destinations: [
            { lat: 48.16921, lng: '-17.13893' },
            { lat: -48.18242, lng: 17.05485 },
            { lat: '48.12532', lng: 17.097 }
          ],
          route_computing: 'fastest',
          units: 'metric',
          vehicle_type: 'car',
          max_speed: 100
        })
      ).to.deep.equal({
        origins: ['48.15544,17.10766', '48.14306,-17.12216', '-48.1577,17.16626'],
        destinations: ['48.16921,-17.13893', '-48.18242,17.05485', '48.12532,17.097'],
        route_computing: 'fastest',
        units: 'metric',
        vehicle_type: 'car',
        max_speed: 100
      })
    })

    it('should return a valid respone', (done) => {
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
        expect(error).to.be.null
        expect(response.status).to.equal(200)
        expect(response.data).to.be.not.empty
        done()
      })
    })
  })

  describe('sendToNavi', () => {
    it('should return a valid query', function () {
      expect(
        sendToNavi.validator({
          message: 'Message',
          name: 'Name',
          tags: 'login_tags',
          directions_api_parameters: {
            origin: { lat: '48.11028597523363', lng: -17.12724566459656 },
            destination: { lat: 48.28490634600474, lng: '17.73373603820801' },
            speed_profiles: true,
            traffic: false,
            waypoints: [
              { lat: '48.21094727794912', lng: '17.25565910339356' },
              { lat: -48.21462203499331, lng: 17.38444805145264, isVia: false },
              { lat: 48.2050556774789, lng: 17.418479919433597, stopTime: 600 },
              { lat: 48.202123924724624, lng: 17.528600692749027, isVia: true, stopTime: 0 },
              { lat: 48.241824189703564, lng: -17.697687149047855, isVia: false, stopTime: 600 }
            ],
            avoid: ['unpaved', 'ferries'],
            avoid_rectangles: [
              [
                { lat: '48.148564905217164', lng: 17.156181335449222 },
                { lat: -48.12702823764068, lng: 17.156181335449222 }
              ],
              [
                { lat: -48.16116195751926, lng: 17.165279388427738 },
                { lat: 48.16116195751926, lng: 17.19995498657227 },
                { lat: '48.15028286718964', lng: 17.19995498657227 },
                { lat: 48.15028286718964, lng: -17.165279388427738 }]
            ],
            avoid_countries: ['ger', 'hun'],
            vehicle_heading: 90,
            vehicle_type: 'car',
            route_computing: 'fastest',
            compute_alternatives: false,
            units: 'metric',
            max_speed: 130,
            departure_time: 1000,
            prefer_right_turn: false,
            dest_in_driving_side: false,
            total_weight: 12000,
            axle_weight: 1000,
            total_length: 12,
            width: 10,
            height: 4,
            trailers: 6,
            vehicle_axles: 6,
            general_hazard: false,
            water_hazard: false,
            tunnel: 'b',
            steps: true,
            lang: 'usa'
          },
          directions_api_result: {
            route: '_rwdHeqmgBBeCn@BMzGA^AvBAbCi@?GGKOAq@G[?c@L}IHmGDoD@u@@WHeHD_EFqDHsFPmKHwCVqRF{DBkCBsC@cA@KA{DGsBWiEc@kDw@eEOk@IWy@aCy@kBgAqBKUa@}@aDmFGIKOkEqG_E}FoBuCsAqBy@kAg@s@cG{I[e@Yc@c@m@kAeBeDyE_C_EsAcDcAeDkAqG[yCYyGQk[CeC?sAGeOEiJMy]AeAIuLY{Hg@sF[uB_BsHeAgD{AqDo@mAcD{EiCkCiDcCaBw@m@WcD{@}De@oAKaAKGAgJs@iBMgE[{AMm@EkDWwXwBwCW}@K]EmAMwC]KAuFy@a@GaAQyHyAuG_Bu@Q_EgA{KoDmHoCiHcDyF}CqEqCgI}FeK}I{@{@mF{FEEOOuHgJoCuDcF_Ia@q@Ka@sCeFe@kBQwAEqEEq@[qAg@q@_@WQG_ABaBv@UR_BdAgBlAmBx@aARqDh@oFt@YBuJtAu@Nm@HsI|A}@PkTbDsFbAy@N{@?SIOFG`@k@d@gBbAcAd@WJcAb@eBj@}Dr@yDRoB?sHi@kCa@oAc@wB{A_A_AGUo@q@oAsAa@_@_@O]?c@N}@bAIZy@hAkAlBaCtD]z@YhBy@zCyC|GcG|Im@x@{ClDeBxAo@f@s@bAc@n@_AvAo@|@a@j@cBdCaDhG_@z@uAnEg@dBIX_AxDcBvG_@bAe@xAs@fAi@`AaAbB[ZMPYPUHk@Gc@m@cDsLScAyAuIk@}BwBaHsK}[cDgGi@o@gD}Ee@q@_@m@iCmDqQmVaJuKqI{KcB{Ag@e@gCoAwD{@uAO{C?_CDiDCiBUoAc@cCmAqAgAyEcGQSMOoCkDg@m@a@e@e@i@e@g@aGoGoBqBmHsHa@c@YYqBoCm@{@SWkBgCgEgDY[cBaBeAyAwBoDiCaF}@eBg@{@e@cA_AmCq@oBUeAa@iB[sASeAkAiHyAsIwDuTqAsGaBiF{AsDcCuEeB}B}A}AmAcAyEqC}@e@eEgAaBYuJcA[EmDaB}AoAgAoAsBqDiAuCCGYmAOs@eA_HO_AOwAE_@[wCIeAIeAGaAGaAMyCu@cGOe@q@gBuCgFuDyF}G_MGI_@k@uD_E_BgBWKOOUUo@i@o@k@eAkA}BkCk@o@y@aAMMMQOOqC_Dq@y@aAgA_@c@]SC]KKO?u@aAg@k@mAwAk@o@[[c@i@a@g@o@u@aAeAeAmASS_AiA_BcCsA}CEMc@uAsA{EqAeHs@gEEQQiAKm@COMyF?YCo@Ea@_AuDEUsAb@u@VW{CVzCt@WrAc@oBaGk@aB]aAGKq@qAa@c@u@[e@Qq@YiDwAS[S}@Ke@i@aCo@uCKa@Om@Mo@S_AGUWaASu@Qm@_@gBeA{EO]o@aBiBwBiA{@u@_@_@QeASeBGaAA{CNEQIEMVeCNsCEiEKaR[}GKgAGkAM{Dk@uCqAkCaBa@[kEoDY[_@i@{IkPaCaGs@aBe@kAOa@oD{I[y@M[}B}Fe@oAmB}CoAiAyCuBs@k@cCiB_@YyAgAoCkBk@c@c@YkBu@}EaAi@KeASKCuEy@gHqAg@ImB]uHuA{Bq@sDsB_PwLIGgDgCkBsAq@e@c@UmBeAcDgBcBeA_Bm@e@EsAOcFm@wDe@QCQCu@BmAFkBDs@@YW{A_Da@}@IOoBkEMYqAaHe@kCWmAk@uAKq@Ew@Ym@}DtAq@Fa@DaBRkBTcBPkANYAk@GsBQ[C[EqAQ]MWOm@o@e@mAUkBMmDOcAY_Ak@eA{@}@aA[gBIeAg@g@Q[?sBlAe@N_@@UGqBoAuDwCKIe@g@QU]iAkAkG_@sA_@_AKSYcAK{@TkBZoCZqCTwBPmBx@kJf@mFp@wHhBkSRuF^_MTuHj@gSXeH`@kFTcBp@oC~CqG`@mAX{AFmAiCusASkNa@}Qy@ie@CoAEuBs@__@E{By@gIq@yB{AuDmAyDcOwq@_GqLy@sAiCqFuCiImGiScGuNiCmKiCkHYgAAgFc@oEc@uCOcCAc@DcCZiC^_BLWpAgArDoAj@Yl@q@l@kBb@aFd@oFHkA?g@A{BK{AEa@mA{KQ{BKoBAkK@uAIaAwAoE{CkIyAiKaO{jAkGowBKcEq@}Hg@gDw@yDyAeFsDcIcB_CSWqB_DmVq]}OkUwO{VqEeHmAoBaCaEa@}@U_BKiDGaBAs@Cy@IqBCkCVsBh@}AnJuQ~AsCpMoU^y@Hc@Co@eAiCgAmCQeBMeDSkGKwBi@gJQaDWcF[iEY}AoKcb@m@eCKi@]qCYqLw@eYCoEj@_HBcDQcCqBuKKo@k@}Cy@sEo@wEe@iDc@aEWmCy@sHi@eDo@qBmCkGgOq]k@gB_@kB_@mDwDkoAM}Di@oQKsCSwGa@uNIuA_AiHcBuLGk@Ig@Kw@u@yFoAuIG]K{@a@wCCmABa@PYpAIf@DpEDvE@eA_HrCkDzA_CYk@}CoJiByFEMc@uAAYaBvBEPe@p@c@h@g@r@{HpJi@d@',
            legs: [{
              distance: {
                value: 25998
              },
              duration: {
                value: 1801
              },
              start_location: {
                latitude: 48.13104,
                longitude: '17.11395'
              },
              end_location: {
                latitude: '48.28486',
                longitude: 17.27051
              }
            }, {
              distance: {
                value: 30871
              },
              duration: {
                value: 2005
              },
              start_location: {
                latitude: '48.28486',
                longitude: 17.27051
              },
              end_location: {
                latitude: 48.38535,
                longitude: 17.57528
              }
            }]
          }
        })
      ).to.deep.equal({
        message: 'Message',
        name: 'Name',
        tags: 'login_tags',
        directions_api_parameters: {
          origin: '48.11028597523363,-17.12724566459656',
          destination: '48.28490634600474,17.73373603820801',
          speed_profiles: true,
          waypoints: '48.21094727794912,17.25565910339356,0|-48.21462203499331,17.38444805145264,0|48.2050556774789,17.418479919433597,600|via:48.202123924724624,17.528600692749027,0|48.241824189703564,-17.697687149047855,600',
          avoid: 'unpaved|ferries',
          avoid_rectangles: '48.148564905217164,17.156181335449222|-48.12702823764068,17.156181335449222;-48.16116195751926,17.165279388427738|48.16116195751926,17.19995498657227|48.15028286718964,17.19995498657227|48.15028286718964,-17.165279388427738',
          avoid_countries: 'ger|hun',
          vehicle_heading: 90,
          vehicle_type: 'car',
          route_computing: 'fastest',
          units: 'metric',
          max_speed: 130,
          departure_time: 1000,
          total_weight: 12000,
          axle_weight: 1000,
          total_length: 12,
          width: 10,
          height: 4,
          trailers: 6,
          vehicle_axles: 6,
          tunnel: 'b',
          steps: true,
          lang: 'usa'
        },
        directions_api_result: {
          route: '_rwdHeqmgBBeCn@BMzGA^AvBAbCi@?GGKOAq@G[?c@L}IHmGDoD@u@@WHeHD_EFqDHsFPmKHwCVqRF{DBkCBsC@cA@KA{DGsBWiEc@kDw@eEOk@IWy@aCy@kBgAqBKUa@}@aDmFGIKOkEqG_E}FoBuCsAqBy@kAg@s@cG{I[e@Yc@c@m@kAeBeDyE_C_EsAcDcAeDkAqG[yCYyGQk[CeC?sAGeOEiJMy]AeAIuLY{Hg@sF[uB_BsHeAgD{AqDo@mAcD{EiCkCiDcCaBw@m@WcD{@}De@oAKaAKGAgJs@iBMgE[{AMm@EkDWwXwBwCW}@K]EmAMwC]KAuFy@a@GaAQyHyAuG_Bu@Q_EgA{KoDmHoCiHcDyF}CqEqCgI}FeK}I{@{@mF{FEEOOuHgJoCuDcF_Ia@q@Ka@sCeFe@kBQwAEqEEq@[qAg@q@_@WQG_ABaBv@UR_BdAgBlAmBx@aARqDh@oFt@YBuJtAu@Nm@HsI|A}@PkTbDsFbAy@N{@?SIOFG`@k@d@gBbAcAd@WJcAb@eBj@}Dr@yDRoB?sHi@kCa@oAc@wB{A_A_AGUo@q@oAsAa@_@_@O]?c@N}@bAIZy@hAkAlBaCtD]z@YhBy@zCyC|GcG|Im@x@{ClDeBxAo@f@s@bAc@n@_AvAo@|@a@j@cBdCaDhG_@z@uAnEg@dBIX_AxDcBvG_@bAe@xAs@fAi@`AaAbB[ZMPYPUHk@Gc@m@cDsLScAyAuIk@}BwBaHsK}[cDgGi@o@gD}Ee@q@_@m@iCmDqQmVaJuKqI{KcB{Ag@e@gCoAwD{@uAO{C?_CDiDCiBUoAc@cCmAqAgAyEcGQSMOoCkDg@m@a@e@e@i@e@g@aGoGoBqBmHsHa@c@YYqBoCm@{@SWkBgCgEgDY[cBaBeAyAwBoDiCaF}@eBg@{@e@cA_AmCq@oBUeAa@iB[sASeAkAiHyAsIwDuTqAsGaBiF{AsDcCuEeB}B}A}AmAcAyEqC}@e@eEgAaBYuJcA[EmDaB}AoAgAoAsBqDiAuCCGYmAOs@eA_HO_AOwAE_@[wCIeAIeAGaAGaAMyCu@cGOe@q@gBuCgFuDyF}G_MGI_@k@uD_E_BgBWKOOUUo@i@o@k@eAkA}BkCk@o@y@aAMMMQOOqC_Dq@y@aAgA_@c@]SC]KKO?u@aAg@k@mAwAk@o@[[c@i@a@g@o@u@aAeAeAmASS_AiA_BcCsA}CEMc@uAsA{EqAeHs@gEEQQiAKm@COMyF?YCo@Ea@_AuDEUsAb@u@VW{CVzCt@WrAc@oBaGk@aB]aAGKq@qAa@c@u@[e@Qq@YiDwAS[S}@Ke@i@aCo@uCKa@Om@Mo@S_AGUWaASu@Qm@_@gBeA{EO]o@aBiBwBiA{@u@_@_@QeASeBGaAA{CNEQIEMVeCNsCEiEKaR[}GKgAGkAM{Dk@uCqAkCaBa@[kEoDY[_@i@{IkPaCaGs@aBe@kAOa@oD{I[y@M[}B}Fe@oAmB}CoAiAyCuBs@k@cCiB_@YyAgAoCkBk@c@c@YkBu@}EaAi@KeASKCuEy@gHqAg@ImB]uHuA{Bq@sDsB_PwLIGgDgCkBsAq@e@c@UmBeAcDgBcBeA_Bm@e@EsAOcFm@wDe@QCQCu@BmAFkBDs@@YW{A_Da@}@IOoBkEMYqAaHe@kCWmAk@uAKq@Ew@Ym@}DtAq@Fa@DaBRkBTcBPkANYAk@GsBQ[C[EqAQ]MWOm@o@e@mAUkBMmDOcAY_Ak@eA{@}@aA[gBIeAg@g@Q[?sBlAe@N_@@UGqBoAuDwCKIe@g@QU]iAkAkG_@sA_@_AKSYcAK{@TkBZoCZqCTwBPmBx@kJf@mFp@wHhBkSRuF^_MTuHj@gSXeH`@kFTcBp@oC~CqG`@mAX{AFmAiCusASkNa@}Qy@ie@CoAEuBs@__@E{By@gIq@yB{AuDmAyDcOwq@_GqLy@sAiCqFuCiImGiScGuNiCmKiCkHYgAAgFc@oEc@uCOcCAc@DcCZiC^_BLWpAgArDoAj@Yl@q@l@kBb@aFd@oFHkA?g@A{BK{AEa@mA{KQ{BKoBAkK@uAIaAwAoE{CkIyAiKaO{jAkGowBKcEq@}Hg@gDw@yDyAeFsDcIcB_CSWqB_DmVq]}OkUwO{VqEeHmAoBaCaEa@}@U_BKiDGaBAs@Cy@IqBCkCVsBh@}AnJuQ~AsCpMoU^y@Hc@Co@eAiCgAmCQeBMeDSkGKwBi@gJQaDWcF[iEY}AoKcb@m@eCKi@]qCYqLw@eYCoEj@_HBcDQcCqBuKKo@k@}Cy@sEo@wEe@iDc@aEWmCy@sHi@eDo@qBmCkGgOq]k@gB_@kB_@mDwDkoAM}Di@oQKsCSwGa@uNIuA_AiHcBuLGk@Ig@Kw@u@yFoAuIG]K{@a@wCCmABa@PYpAIf@DpEDvE@eA_HrCkDzA_CYk@}CoJiByFEMc@uAAYaBvBEPe@p@c@h@g@r@{HpJi@d@',
          legs: [{
            distance: {
              value: 25998
            },
            duration: {
              value: 1801
            },
            start_location: {
              latitude: 48.13104,
              longitude: 17.11395
            },
            end_location: {
              latitude: 48.28486,
              longitude: 17.27051
            }
          }, {
            distance: {
              value: 30871
            },
            duration: {
              value: 2005
            },
            start_location: {
              latitude: 48.28486,
              longitude: 17.27051
            },
            end_location: {
              latitude: 48.38535,
              longitude: 17.57528
            }
          }]
        }
      })
    })

    it('should return a valid respone', (done) => {
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
        directions_api_result: {
          route: '_rwdHeqmgBBeCn@BMzGA^AvBAbCi@?GGKOAq@G[?c@L}IHmGDoD@u@@WHeHD_EFqDHsFPmKHwCVqRF{DBkCBsC@cA@KA{DGsBWiEc@kDw@eEOk@IWy@aCy@kBgAqBKUa@}@aDmFGIKOkEqG_E}FoBuCsAqBy@kAg@s@cG{I[e@Yc@c@m@kAeBeDyE_C_EsAcDcAeDkAqG[yCYyGQk[CeC?sAGeOEiJMy]AeAIuLY{Hg@sF[uB_BsHeAgD{AqDo@mAcD{EiCkCiDcCaBw@m@WcD{@}De@oAKaAKGAgJs@iBMgE[{AMm@EkDWwXwBwCW}@K]EmAMwC]KAuFy@a@GaAQyHyAuG_Bu@Q_EgA{KoDmHoCiHcDyF}CqEqCgI}FeK}I{@{@mF{FEEOOuHgJoCuDcF_Ia@q@Ka@sCeFe@kBQwAEqEEq@[qAg@q@_@WQG_ABaBv@UR_BdAgBlAmBx@aARqDh@oFt@YBuJtAu@Nm@HsI|A}@PkTbDsFbAy@N{@?SIOFG`@k@d@gBbAcAd@WJcAb@eBj@}Dr@yDRoB?sHi@kCa@oAc@wB{A_A_AGUo@q@oAsAa@_@_@O]?c@N}@bAIZy@hAkAlBaCtD]z@YhBy@zCyC|GcG|Im@x@{ClDeBxAo@f@s@bAc@n@_AvAo@|@a@j@cBdCaDhG_@z@uAnEg@dBIX_AxDcBvG_@bAe@xAs@fAi@`AaAbB[ZMPYPUHk@Gc@m@cDsLScAyAuIk@}BwBaHsK}[cDgGi@o@gD}Ee@q@_@m@iCmDqQmVaJuKqI{KcB{Ag@e@gCoAwD{@uAO{C?_CDiDCiBUoAc@cCmAqAgAyEcGQSMOoCkDg@m@a@e@e@i@e@g@aGoGoBqBmHsHa@c@YYqBoCm@{@SWkBgCgEgDY[cBaBeAyAwBoDiCaF}@eBg@{@e@cA_AmCq@oBUeAa@iB[sASeAkAiHyAsIwDuTqAsGaBiF{AsDcCuEeB}B}A}AmAcAyEqC}@e@eEgAaBYuJcA[EmDaB}AoAgAoAsBqDiAuCCGYmAOs@eA_HO_AOwAE_@[wCIeAIeAGaAGaAMyCu@cGOe@q@gBuCgFuDyF}G_MGI_@k@uD_E_BgBWKOOUUo@i@o@k@eAkA}BkCk@o@y@aAMMMQOOqC_Dq@y@aAgA_@c@]SC]KKO?u@aAg@k@mAwAk@o@[[c@i@a@g@o@u@aAeAeAmASS_AiA_BcCsA}CEMc@uAsA{EqAeHs@gEEQQiAKm@COMyF?YCo@Ea@_AuDEUsAb@u@VW{CVzCt@WrAc@oBaGk@aB]aAGKq@qAa@c@u@[e@Qq@YiDwAS[S}@Ke@i@aCo@uCKa@Om@Mo@S_AGUWaASu@Qm@_@gBeA{EO]o@aBiBwBiA{@u@_@_@QeASeBGaAA{CNEQIEMVeCNsCEiEKaR[}GKgAGkAM{Dk@uCqAkCaBa@[kEoDY[_@i@{IkPaCaGs@aBe@kAOa@oD{I[y@M[}B}Fe@oAmB}CoAiAyCuBs@k@cCiB_@YyAgAoCkBk@c@c@YkBu@}EaAi@KeASKCuEy@gHqAg@ImB]uHuA{Bq@sDsB_PwLIGgDgCkBsAq@e@c@UmBeAcDgBcBeA_Bm@e@EsAOcFm@wDe@QCQCu@BmAFkBDs@@YW{A_Da@}@IOoBkEMYqAaHe@kCWmAk@uAKq@Ew@Ym@}DtAq@Fa@DaBRkBTcBPkANYAk@GsBQ[C[EqAQ]MWOm@o@e@mAUkBMmDOcAY_Ak@eA{@}@aA[gBIeAg@g@Q[?sBlAe@N_@@UGqBoAuDwCKIe@g@QU]iAkAkG_@sA_@_AKSYcAK{@TkBZoCZqCTwBPmBx@kJf@mFp@wHhBkSRuF^_MTuHj@gSXeH`@kFTcBp@oC~CqG`@mAX{AFmAiCusASkNa@}Qy@ie@CoAEuBs@__@E{By@gIq@yB{AuDmAyDcOwq@_GqLy@sAiCqFuCiImGiScGuNiCmKiCkHYgAAgFc@oEc@uCOcCAc@DcCZiC^_BLWpAgArDoAj@Yl@q@l@kBb@aFd@oFHkA?g@A{BK{AEa@mA{KQ{BKoBAkK@uAIaAwAoE{CkIyAiKaO{jAkGowBKcEq@}Hg@gDw@yDyAeFsDcIcB_CSWqB_DmVq]}OkUwO{VqEeHmAoBaCaEa@}@U_BKiDGaBAs@Cy@IqBCkCVsBh@}AnJuQ~AsCpMoU^y@Hc@Co@eAiCgAmCQeBMeDSkGKwBi@gJQaDWcF[iEY}AoKcb@m@eCKi@]qCYqLw@eYCoEj@_HBcDQcCqBuKKo@k@}Cy@sEo@wEe@iDc@aEWmCy@sHi@eDo@qBmCkGgOq]k@gB_@kB_@mDwDkoAM}Di@oQKsCSwGa@uNIuA_AiHcBuLGk@Ig@Kw@u@yFoAuIG]K{@a@wCCmABa@PYpAIf@DpEDvE@eA_HrCkDzA_CYk@}CoJiByFEMc@uAAYaBvBEPe@p@c@h@g@r@{HpJi@d@',
          legs: [{
            distance: {
              value: 25998
            },
            duration: {
              value: 1801
            },
            start_location: {
              latitude: 48.13104,
              longitude: 17.11395
            },
            end_location: {
              latitude: 48.28486,
              longitude: 17.27051
            }
          }, {
            distance: {
              value: 30871
            },
            duration: {
              value: 2005
            },
            start_location: {
              latitude: 48.28486,
              longitude: 17.27051
            },
            end_location: {
              latitude: 48.38535,
              longitude: 17.57528
            }
          }]
        }
      }, (error, response) => {
        expect(error).to.be.null
        expect(response.status).to.equal(200)
        done()
      })
    })
  })
})