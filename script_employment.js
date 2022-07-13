console.log('Employment')

async function handleData() {

  const svg = d3.select('#svg_employment')

  let data = await d3.json('ds_salaries.json')

  const margin = { top: 30, right: 20, bottom: 10, left: 40 }
  const width = 800 - (margin.left + margin.right)
  const height = 800 - (margin.top + margin.bottom)

  const circleGenerator = d3.pie().sort(null);

  const getExperienceLevel = (data) => {
    const experienceList = Array.from(new Set(data.map((employment) => {
      return employment.experience_level
    }))).map(name => ({name, count: 0}))
    experienceList.forEach(employment => {
      employment.count = data.filter(d => d.experience_level === employment.name).length
    });
    console.log(experienceList)
    return experienceList
  }

  const workRemote = (data) => {

  }
  
  const getExperienceCompanySize = (data, experience, color) => {
    return {
      count: data.filter((worker) => worker.experience_level === experience).length,
      experience: experience,
      color: color
    }
  };

  const experienceData = [
    getExperienceCompanySize(data, 'EN', '#8B0435'),
    getExperienceCompanySize(data, 'MI', '#B15999'),
    getExperienceCompanySize(data, 'SE', '#4DA86D'),
    getExperienceCompanySize(data, 'EX', '#F57E00'),
  ]

  const circleData = circleGenerator(experienceData.map((data) => data.count));

  console.log(experienceData)

  const createCircle = d3.arc()
    .innerRadius(30)
    .outerRadius(300)
    .padAngle(0.01)

  const sliceGroup = svg
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const colorWheel = d3.scaleOrdinal().range(experienceData.map((data) => data.color));

  const circlePath = sliceGroup
    .selectAll('path')
    .data(circleData)
    .enter()
    .append('path')
    .attr('d', createCircle)
    .attr('fill', colorWheel)

  const labels = svg
    .append('g')

  labels
    .selectAll('circle')
    .data(experienceData)
    .enter()
    .append('circle')
    .attr('r', '5')
    .attr('cx', 10)
    .attr('cy', (d, i) => (i * 25) + 60)
    .attr('fill', (d, i) => d.color)

  labels
    .selectAll('text')
    .data(experienceData)
    .enter()
    .append('text')
    .text((d) => `${d.count} ${d.experience[0].toUpperCase() + d.experience.slice(1)}`)
    .attr('x', 23)
    .attr('y', (d, i) => (i * 25) + 60)
    .attr('class', 'labelText')

  const title = svg
    .append('g')

  title
    .append('text')
    .text('Number of / Experience level of Data Science Jobs')
    .attr('transform', `translate(${width / 2 - 140}, 30)`)
    .attr('class', 'labelText')

  title
    .append('text')
    .text('EN Entry / Junior MI Mid-level / SE Senior-level / Expert EX Executive-level')
    .attr('transform', `translate(${width / 2 - 240}, 60)`)
    .attr('class', 'labelText')


}

handleData()