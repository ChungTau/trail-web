import { PointProps, RACEPOINTS, RACESERVICESTYPE } from "../../components/CheckPoint";

export type RouteInfo = {
    racePoints: PointProps[];
  };
  
  export type RouteInfos = {
    [key: string]: RouteInfo;
  };

const gpx1Info: RouteInfo = {
    racePoints:[
        
    ] as PointProps[]
}

const gpx2Info: RouteInfo = {
    racePoints:[
        {
            url: 'https://e-cgo.org.hk/upload/section/115/photo/61e8dcc217281.jpg',
            placeName: "西貢北潭涌傷健樂園",
            type: RACEPOINTS.Start,
            distance:0,
            elevation:0,
            services:[RACESERVICESTYPE.FOODNDRINKS, RACESERVICESTYPE.ORGANISATIONBUS, RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Sai_Wan.jpg/1200px-Sai_Wan.jpg',
            placeName: "西灣",
            order:1,
            type: RACEPOINTS.Checkpoint,
            distance:15.9,
            elevation:0,
            cutOffTime: "第一天晚上9時",
            services:[RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url:'https://playeateasy.com/wp-content/uploads/2019/11/blog5.jpg',
            placeName: "北潭坳",
            order:2,
            type: RACEPOINTS.Checkpoint,
            distance:24.4,
            elevation:0,
            cutOffTime: "第二天凌晨零0時",
            services:[RACESERVICESTYPE.FOODNDRINKS,RACESERVICESTYPE.ORGANISATIONBUS,RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url: 'https://4.bp.blogspot.com/-sDkr-kPFUFI/WoGF8pMjIII/AAAAAAAAayk/edgSADs_WGwUWwTYAjU4u0lppIy_WyKlQCLcBGAs/s1600/%25E6%25B0%25B4%25E6%25B5%25AA%25E7%25AA%25A9028.jpg',
            placeName: "企嶺下",
            order:3,
            type: RACEPOINTS.Checkpoint,
            distance:33.4,
            elevation:0,
            cutOffTime: "第二天上午7時",
            services:[RACESERVICESTYPE.FOODNDRINKS,RACESERVICESTYPE.ORGANISATIONBUS,RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/HK_GilwellCampsite_Archway.JPG',
            placeName: "基維爾營",
            order:4,
            type: RACEPOINTS.Checkpoint,
            distance:46.2,
            elevation:0,
            cutOffTime: "第二天下午3時",
            services:[RACESERVICESTYPE.FOODNDRINKS,RACESERVICESTYPE.ORGANISATIONBUS,RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url: 'https://i0.wp.com/fitz.hk/wp-content/uploads/2017/10/%E9%A6%99%E6%B8%AF%E5%B1%B1%E5%A5%B3-%E7%99%BB%E7%95%A2%E6%9E%B6%E5%B1%B1-%E7%9B%A1%E7%9C%BA%E4%B9%9D%E9%BE%8D%E7%BE%8E%E6%99%AF-8.jpg?resize=696%2C522&ssl=1',
            placeName: "畢架山",
            order:5,
            type: RACEPOINTS.Checkpoint,
            distance:54.1,
            elevation:0,
            cutOffTime: "第二天下午5時",
            services:[RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url: 'https://www.initialp.hk/home/sites/default/files/styles/fill_article/public/car-trip/1429904596_vw-jetta-long-test-2014-02-600x399.jpg?itok=SmyEZpgX',
            placeName: "走私坳警察射擊場",
            order:6,
            type: RACEPOINTS.Checkpoint,
            distance:59.6,
            elevation:0,
            cutOffTime: "第二天晚上9時",
            services:[RACESERVICESTYPE.FOODNDRINKS,RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url: 'https://1.bp.blogspot.com/-ClGIOPAOoSM/XZMohv1CVuI/AAAAAAABHls/fqunXyg7FxQvIpVuz1qgH6uLpgN7X0-0QCLcBGAsYHQ/s1600/OMIMG_20190916_111608.jpg',
            placeName: "鉛礦坳",
            order:7,
            type: RACEPOINTS.Checkpoint,
            distance:68.4,
            elevation:0,
            cutOffTime: "第三天凌晨1時",
            services:[RACESERVICESTYPE.FOODNDRINKS,RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url: 'https://cdn.hk01.com/di/media/images/596029/org/82e2da0c9dc81965f732ef6691a36cd9.jpg/krhCSv4XQb3nbRbhkOL1A3q7wahEtt_8bFXwwWxV8ME?v=w1920',
            placeName: "大帽山",
            order:8,
            type: RACEPOINTS.Checkpoint,
            distance:77.6,
            elevation:0,
            cutOffTime: "第三天上午7時",
            services:[RACESERVICESTYPE.FOODNDRINKS,RACESERVICESTYPE.ORGANISATIONBUS,RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url: 'https://www.oasistrek.com/images/tai_lam_chung/cover.jpg',
            placeName: "大欖涌水塘",
            order:9,
            type: RACEPOINTS.Checkpoint,
            distance:87.1,
            elevation:0,
            cutOffTime: "第三天上午10時",
            services:[RACESERVICESTYPE.FOODNDRINKS,RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
        {
            url: 'https://www.lcsd.gov.hk/en/healthy/hiking/common/hiking/graphics/photos/d9/04.1.jpg',
            placeName: "元朗大棠燒烤區",
            type: RACEPOINTS.Finish,
            distance:97,
            elevation:0,
            cutOffTime: "第三天下午2時",
            services:[RACESERVICESTYPE.FOODNDRINKS,RACESERVICESTYPE.ORGANISATIONBUS,RACESERVICESTYPE.EMERGENCY, RACESERVICESTYPE.WC],
        },
    ] as PointProps[]
}

const gpx3Info: RouteInfo = {
    racePoints:[

    ] as PointProps[]
}

export const routeInfos: RouteInfos={
    gpx1: gpx1Info,
    gpx2: gpx2Info,
    gpx3: gpx3Info
};