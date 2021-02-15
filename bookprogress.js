// my mod of https://github.com/Juniorchen2012/scriptable/blob/master/progress.js

// const width=125 // for small widget
const width=275
const h=5
const w = new ListWidget()
w.backgroundColor=new Color("#222222")

let listName = 'READING'
let list = await Calendar.findOrCreateForReminders(listName)
let reminders = await Reminder.allIncomplete([list])

for (reminder of reminders) {  

  // if (reminder.notes != undefined){
   if (reminder.notes.includes("#reading")|reminder.notes.includes("#inprogress")){
		let titleForURL = encodeURI(reminder.title)
		let gtURL = "goodtask3://task?title="+titleForURL
		let total = reminder.notes.split('@total: ').pop().split('\n')[0]
		let pos = reminder.notes.split('@pos: ').pop().split('\n')[0]
		let status = reminder.notes.split('@status: ').pop().split('\n')[0]
		getwidget(total, pos, reminder.title, gtURL, status)
	}
}

Script.setWidget(w)
Script.complete()
w.presentLarge()

function getwidget(total, haveGone, str, url, status) {
  const titlew = w.addText(str)			
  if (status=="#inprogress"){
    titlew.textColor = new Color("#ff6b6b")}
  else {
    titlew.textColor = new Color("#dfefca")}
  titlew.font = Font.boldSystemFont(11)
  titlew.url = url
  w.addSpacer(6)
  const imgw = w.addImage(creatProgress(total,haveGone))
  imgw.imageSize=new Size(width, h)
  w.addSpacer(6)
}

function creatProgress(total,havegone){
const context =new DrawContext()
context.size=new Size(width, h)
context.opaque=false
context.respectScreenScale=true
context.setFillColor(new Color("#514f59")) // BG
const path = new Path()
path.addRoundedRect(new Rect(0, 0, width, h), 3, 2)
context.addPath(path)
context.fillPath()
context.setFillColor(new Color("#fff9a5")) // INDICATOR
const path1 = new Path()
path1.addRoundedRect(new Rect(0, 0, width*havegone/total, h), 3, 2)
context.addPath(path1)
context.fillPath()
return context.getImage()
}

