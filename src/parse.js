var methods = { m: moveTo
              , z: closePath
              , l: lineTo

              , h: 'horizontalLine'
              , v: 'verticalLine'
              , c: 'curveTo'
              , s: 'shortCurveTo'
              , q: 'quadraticBezier'
              , t: 'smoothQuadraticBezier'
              , a: 'elipticalArc'
              }

function parse (str) {
  var path = addToBuffer(this)

  if (path.coords.length) return render(path)

  str.match(/[a-z][^a-z]*/ig).forEach(function (segment) {
    var instruction = methods[segment[0].toLowerCase()]
      , coords = segment.slice(1).trim().split(/,| /g)

    ;[].push.apply(path.coords, coords)

    instruction.call ?
      twoEach(coords.map(parseFloat), instruction, path) :
      console.error(instruction + ' ' + segment[0] + ' is not yet implemented')
  })
}

function moveTo(x, y) {
  pos = [x, canv.height - y]
}

function closePath() {
  lineTo.apply(this, this.coords.slice(0, 2))
}

function lineTo(x, y) {
  addLine.apply(this, pos.concat(pos = [x, canv.height - y]))
}
