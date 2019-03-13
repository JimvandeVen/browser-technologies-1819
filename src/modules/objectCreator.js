function createObject(activity){
  let activityObject = {
    title: activity.titles.title._text,
    img: activity.coverimages.coverimage._text,
    detailPage: activity["detail-page"]._text,
    summary: activity.summaries.summary._text,
    date: activity.summaries.summary._text.substring(activity.summaries.summary._text.indexOf(" "), activity.summaries.summary._text.indexOf(",")).trim(),
    subject: activity.subjects["topical-subject"]._attributes["search-term"]
  }
  return activityObject
}

export {createObject}
