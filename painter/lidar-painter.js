function Painter() {
    this.paintLidar = function (canvas,center,radioPix,palette,rotate,dataLength,data) {
        let context = canvas.getContext('2d');
        context.imageSmoothingEnabled  = true;
        context.clearRect(0,0,canvas.width,canvas.height);
        //绘制底图
        context.fillStyle = 'rgba(42,0,73,0.4)';
        context.beginPath();
        context.moveTo(center.x,center.y);
        context.arc(center.x,center.y,radioPix,
            (data[0].Heading+rotate)*Math.PI/180,(data[data.length-1].Heading+rotate)*Math.PI/180);
        context.closePath();
        context.fill();
        //绘制雷达扇形
        for(let d = 0;d<data.length;d++){
            let beam = data[d];
            //设置渐变
            let grd = context.createRadialGradient(center.x,center.y,0,center.x,center.y,radioPix);
            for(let i=0;i<dataLength;i++){
                let value = beam.Datas[i];
                let index = Math.floor(value*256);
                //console.log(index);
                if(index<0)
                    index=0;
                if(index>255)
                    index=255;
                let color = 'rgba('+palette[index*4]+','+palette[index*4+1]+','+palette[index*4+2]+','+(0.6+value)+')';
                //console.log(color);
                grd.addColorStop(i/dataLength,color);
            }
            context.fillStyle = grd;
            //绘制扇形
            context.beginPath();
            context.moveTo(center.x,center.y);
            let stopAngle = beam.Heading+rotate;
            if(d<data.length-1)
                stopAngle= data[d+1].Heading+rotate;
            context.arc(center.x,center.y,radioPix,(beam.Heading+rotate)*Math.PI/180,stopAngle*Math.PI/180);
            context.closePath();
            context.fill();
        }
    }
}

module.exports = Painter;