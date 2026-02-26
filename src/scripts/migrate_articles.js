/* eslint-disable max-len */
// migrate_articles.js
// Usage: mongosh "mongodb://localhost:27017/YOUR_DB_NAME" migrate_articles.js
// Migrate ONE ISSUE AT A TIME — change the array below for each run.

// ============================================================
// EDIT THIS ARRAY — one object per article
// ============================================================
const ARTICLES_TO_MIGRATE = [
  {
    title:
      "SECONDARY SCHOOL LEADERS' PERSONALITY AND STUDENTS' DISCIPLINARY BEHAVIOR",
    abstract:
      "This article is a theoretical study of school leaders' personality and students' disciplinary behaviour. The study is hinged on Edwin. (1971) trait theory. The challenges associated with students’ disciplinary behavior appear to be a great concern to all school stakeholders. The aim of this work is to improve on the production of quality students with good disciplinary behaviour in other to achieve school output, certified with excellent character besides good academic performance, to form an insurmountable labour force into the world of works for national development. This paper, therefore, focused on the concept of school leadership, the concept of personality, school leadership personality, students' disciplinary behaviour, impact of leaders' personality on students' disciplinary behaviour, challenges associated with students' discipline, conclusion and suggestions. The paper posits that school leaders' personality is perceived to have a positive influence on students disciplinary behaviour. Finally, the paper recommends moral punishment which is regarded as the corrective “whip” that acts as a negative reinforcer of desired values and cooperative behavior, and well spelt out code of conduct for all students to follow as measures to ensure discipline among students.",
    keywords: [
      'School',
      'Leaders',
      'Personality',
      'Students',
      'Disciplinary Behaviour',
    ],
    authorEmail: 'nelsonetacm@gmail.com',
    coAuthorEmails: [],
    volumeNumber: 8,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 1, end: 9 },
  },
  {
    title: 'THE INTERNAL STRUCTURE OF THE ẸDO FAMILY SALUTATION (ÙKHÙ)',
    abstract:
      "This study examines the internal structure of Ùkhù (the Ẹdo family morning salutation) terms. It seeks to decompose these class of honorific terms in the language and show their internal morphemic computations. The data for the study comprise sixty (60) ùkhù terms gotten from one hundred (100) Ẹdo speakers of different family and communal backgrounds. The terms were extracted and organized in the order of their internal lexical forms and analyzed based on Nida's principles for identifying morphemes. The study finds, among others, that the ukhu terms are generally composed of either dè-, lá- or both prefixes, added to a root which is usually selected in recognition of an iconic personality, a place, a deity or a position of authority which a person occupies. The paper concludes that ùkhù is a compressed version of honorific expressions that began as praise expressions but have become fossilized, over time.",
    keywords: ['Ẹdo', 'Morpheme', 'Honorifics', 'Ukhu', 'Salutation'],
    authorEmail: 'osaigbovo.evbuomwan@uniben.edu',
    coAuthorEmails: ['ighasere.aigbedo@uniben.edu'],
    volumeNumber: 8,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 10, end: 26 },
  },
  {
    title:
      'AN ASSESSMENT OF THE NEXUS BETWEEN LOCAL GOVERNMENT ADMINISTRATION AND COMMUNITY DEVELOPMENT IN UHUNMWODE LOCAL GOVERNMENT AREA, EDO STATE, NIGERIA',
    abstract:
      'This study examined the need for local government functionaries to step up their service delivery capacity efforts in order that the essence for which the local governments are created – bringing governance and development – to the door step of the people. Two communities were sampled from each of the ten wards in Uhunmwode Local Government Area (LGA). Inhabitants of the ten wards in the local government area including the local council officials constitute the population of this study. Survey research design was adopted for the study and the purposive sampling technique was applied in selecting research respondents. The research instruments used in collecting data were In-depth interview (IDI), Focus group discussion (FGD), Record evaluation and Project assessment. Data obtained were analyzed using qualitative research technique suc as manual thematic and content analysis. The result shows glaring absence/poor basic amenities in the locality which have put the situation of community members in a more precarious state. The challenges include poor political participation by the people, lack of opportunities which orchestrated poor socio-economic fortunes resulting in mass rural- urban drift among others. The study recommend that the local people should be involve in the process of project identification, execution and management in their various communities This study concludes that local government autonomy is being advocated, for legislations in order to support the prescribed degree of competences for the Local Government Area political heads/functionaries that would be in place for the desired impact to be derived.',
    keywords: [
      'Community development',
      'Rural',
      'Uhunmwode Local Government Area',
      'Urban Drift',
      'Youth',
    ],
    authorEmail: 'lucky.odia@aauekpoma.edu.ng',
    coAuthorEmails: [],
    volumeNumber: 8,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 27, end: 51 },
  },
  {
    title:
      'APPRAISAL OF THE USE OF SOCIAL MEDIA PLATFORMS FOR FORMATIVE ASSESSMENT AMONG UNIVERSITY LECTURERS IN EDO STATE, NIGERIA.',
    abstract:
      'This paper assessed the use of social media platforms for formative assessment among University lecturers in Benin Metropolis, Nigeria. Three research questions and one hypothesis guided this study. The study adopted Ex-Post Facto research design. The population of the study consisted of all the lecturers from Faculty of Education University of Benin and Department of Education, Benson Idahosa University giving a total of 167 lecturers from both Universities. A sample size of 56 lecturers was drawn using multi-stage sampling techniques. One research instrument was used to collect data for the study, Use of Social Media Platforms for Assessment Scale (USMPAS) with 16 items. Cronbach Alpha was used to determine a reliability coefficient of 0.848. Research questions were answered using basic statistics and hypothesis 1 was tested using independent sample t-test. The result of the study revealed that majority of the University lecturers in Benin Metropolis are only familiar with WhatsApp and E-mail. It was recommended that university lecturers should try as much as possible to expand their scope of social media platforms usage for assessment purpose.',
    keywords: [
      'Digitization',
      'university lecturers',
      'level of internet competency',
      '21st Century',
      'formative assessment',
    ],
    authorEmail: 'margaret.denedo@uniben.edu',
    coAuthorEmails: ['ijeoma.opara@uniport.edu.ng'],
    volumeNumber: 8,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 52, end: 67 },
  },
];
// ============================================================

print('=== Article Migration Script ===');
print(`Articles to process: ${ARTICLES_TO_MIGRATE.length}`);

let successCount = 0;
let skipCount = 0;
const errors = [];

for (let i = 0; i < ARTICLES_TO_MIGRATE.length; i++) {
  const articleData = ARTICLES_TO_MIGRATE[i];
  print(
    `\n[${i + 1}/${ARTICLES_TO_MIGRATE.length}] Processing: "${articleData.title.substring(0, 60)}..."`
  );

  try {
    // 1. Find primary author
    const author = db.Users.findOne({
      email: articleData.authorEmail.toLowerCase().trim(),
      role: 'author',
    });
    if (!author)
      throw new Error(`Author not found: ${articleData.authorEmail}`);

    // 2. Find co-authors
    const coAuthorIds = [];
    for (const coEmail of articleData.coAuthorEmails || []) {
      const coAuthor = db.Users.findOne({
        email: coEmail.toLowerCase().trim(),
      });
      if (!coAuthor) throw new Error(`Co-author not found: ${coEmail}`);
      coAuthorIds.push(coAuthor._id);
    }

    // 3. Find volume
    const volume = db.Volumes.findOne({
      volumeNumber: articleData.volumeNumber,
    });
    if (!volume)
      throw new Error(
        `Volume ${articleData.volumeNumber} not found. Create it first in the admin panel.`
      );

    // 4. Find issue — use its publishDate for the article
    const issue = db.Issues.findOne({
      volume: volume._id,
      issueNumber: articleData.issueNumber,
    });
    if (!issue)
      throw new Error(
        `Issue ${articleData.issueNumber} not found for Volume ${articleData.volumeNumber}. Create it first.`
      );

    // 5. Duplicate check
    const duplicate = db.Articles.findOne({
      title: articleData.title,
      issue: issue._id,
    });
    if (duplicate) {
      print(`  ⚠ SKIPPED — article already exists in this issue`);
      skipCount++;
      continue;
    }

    // 6. Build document
    const now = new Date();
    const article = {
      title: articleData.title.trim(),
      abstract: articleData.abstract.trim(),
      keywords: (articleData.keywords || []).map((k) => k.trim()),
      pdfFile: '', // empty — upload later via admin "Manual Articles" tab
      author: author._id,
      coAuthors: coAuthorIds,
      // NO manuscriptId — marks this as manually published
      publishDate: issue.publishDate, // use issue's publish date
      volume: volume._id,
      issue: issue._id,
      articleType: articleData.articleType || 'research_article',
      pages:
        articleData.pages?.start && articleData.pages?.end
          ? { start: articleData.pages.start, end: articleData.pages.end }
          : undefined,
      views: { count: 0, viewers: [] },
      downloads: { count: 0, downloaders: [] },
      citationCount: 0,
      license: 'CC BY 4.0',
      copyrightHolder: 'The Authors',
      isPublished: true,
      publishedAt: now,
      indexingStatus: {
        googleScholar: false,
        base: false,
        core: false,
        internetArchive: false,
      },
      publicationOptions: {
        doiEnabled: false,
        internetArchiveEnabled: false,
        emailNotificationEnabled: false,
      },
      emailNotificationStatus: {
        sent: false,
        idempotencyKey: `migration_${now.getTime()}_${i}`,
        recipientCount: 0,
        failureCount: 0,
      },
      createdAt: now,
      updatedAt: now,
    };

    db.Articles.insertOne(article);
    successCount++;
    print(
      `  ✓ Inserted — Author: ${author.name}, Vol ${articleData.volumeNumber} Iss ${articleData.issueNumber}, Pages ${articleData.pages?.start}-${articleData.pages?.end}`
    );
  } catch (err) {
    errors.push({
      title: articleData.title.substring(0, 50),
      error: err.message,
    });
    print(`  ✗ ERROR: ${err.message}`);
  }
}

print('\n======== SUMMARY ========');
print(`✓ Inserted : ${successCount}`);
print(`⚠ Skipped  : ${skipCount}`);
print(`✗ Errors   : ${errors.length}`);
if (errors.length > 0) {
  print('\nFailed articles:');
  errors.forEach((e, i) => print(`  ${i + 1}. "${e.title}..." — ${e.error}`));
}
print('=========================');
print(
  '\nNext step: Go to Admin → Publication → Manual Articles to upload PDFs.'
);
