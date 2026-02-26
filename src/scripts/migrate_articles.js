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
      'LITERATURE FOR SUSTAINABLE DEVELOPMENT: THEME AS A STRATEGY FOR DEVELOPING NATIONS.',
    abstract:
      'Our aim in this paper is to show how ‘theme’ as a literary device in Modern African Literature contributes to strategies for sustainable development in developing nations. To this end, we have thematically examined Wole Soyinka’s The Interpreters, Ayi Kwei Aah’s The Beautiful Ones Are Not Yet Born, Nanabenyi Kweku Warteinberg’s The Corpse‘s Comedy and Mukotani Rugyendo‘s The Barbed Wire, and explored the themes of alienation, detachment, decay, corruption, materialism, self-centeredness, social and economic injustice as well as insecurity, and the abuse of power in these selected African literary works. Our findings show that these literary works, among others across the African continent, could serve as memoirs guiding incumbent African leaders, and that the alienated and detached intellectuals of the society should be co-opted into the governance of developing nations as a strategy for sustainable development.',
    keywords: ['Theme', 'development', 'strategy', 'sustainable', 'developing'],
    authorEmail: 'nstellakpolubo@yahoo.com',
    coAuthorEmails: ['emmanuel.adeleke@uniben.edu'],
    volumeNumber: 8,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 69, end: 83 },
  },
  {
    title:
      'CONTEMPORARY NIGERIAN COMEDY OF MANNERS: A COMPARATIVE ANALYSIS OF OLA ROTIMI’S OUR HUSBAND AND TRACIE UTOH’S OUR WIVES.',
    abstract:
      'Although the comedy of manners emerged during the Restoration period (1660-1688), it has continued to find expression in plays of all ages and eras after the Restoration. This is largely due to the fact that it is concerned with contemporary issues like marriage/sex, inheritance, fashion and politics. These are issues that have relevance in societies of all ages. Nigerian writers have also written commendable comedies of manners and two of such plays, Ola Rotimi’s Our Husband Has Gone Mad Again (Our Husband) and Tracy Utoh’s response, Our Wives Have Gone Mad Again (Our Wives) form the basis of our analyses in this essay. The essay investigates the characteristics of restoration comedies of manners and vis-a-vis Nigerian comedies of manners and concludes that the genre still finds expression in contemporary societies because of the relevance of its concerns.',
    keywords: [
      'Restoration',
      'Fashion',
      'Contemporary',
      'Manners',
      'Comparative',
    ],
    authorEmail: 'emmanuel.adeleke@uniben.edu',
    coAuthorEmails: [],
    volumeNumber: 8,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 84, end: 97 },
  },
  {
    title:
      'CHILD VENDORING IN USELU, EGOR LOCAL GOVERNMENT AREA BENIN CITY, EDO STATE NIGERIA',
    abstract:
      'Irrespective of the contribution of acts of child vendor to the seeming betterment of the economic situation of families and children alike, the risks that are attached supersede the economic aspect of it. It has been reported that street hawking exposes the male and female child to dangers posed by unscrupulous persons because of their vulnerability at odd hawking hours. Child vendor is increasingly recognized as a crime against the UN Convention on the Rights of the Child, as the labour is likely to interfere with the education and normal development of the children which can be harmful to their health and morals. The main aim of the study was to discover the causes and effects of child vendor in Uselu market, Egor Local Government area of Edo State. The sampled population of the study was made up of 100 respondents who were administered questionnaires with the aid of simple random sampling technique.  Qualitative data for this study was obtained from 10 interviewees who were purposively sampled to participate in in-depth interview sessions. Analyses of data were done with the use of simple percentages for the quantitative data; and the use of manual content analysis for the qualitative data. The study found that 86% and 82% affirmation was given to the position that parents, through their actions or inactions, and promptings of peers respectively were totally responsible for their children activities as vendors. It was also found that 84% confirmation was given to the assertion that the women affairs agencies could assist in the eradication of child vendors in the society. Furthermore, it was strongly believed (91%) that government was in the best position to develop strategies that would curb child vendor in the society. Moreover, it was confirmed that there was a significant relationship between poverty and child vendoring.  In consonant with the findings of this study it could be concluded that children who are vendors are only acting out the actual or subtle directives of their parents or guardians; hence, these children have no blame for engaging in hawking commodities. Mothers place undue pressure on their children to become vendors so as to meet the basic financial needs of the family and also support the bread winner due to the present level of inflation, untold hardship and poverty that is prevalent in the country. The study recommends that a dedicated federal legislation should be enacted to stipulate acts of child vendors as illegal, with parents and guardians of child vendors, as well as those who patronise them, overtly arrested and prosecuted so as serve as deterrent to others.',
    keywords: ['Chid', 'Family', 'Hawking Labour', 'Vendor', 'inflation'],
    authorEmail: 'joseph.egharevba@uniben.edu',
    coAuthorEmails: [],
    volumeNumber: 8,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 98, end: 120 },
  },
  {
    title:
      'CRITICAL EXAMINATION OF CLASHES BETWEEN FULANI PASTORALISTS AND FARMERS IN EDO STATE: IMPLICATION FOR INSECURITY IN TRADITIONALLY SECURED COMMUNITIES',
    abstract:
      'This study examines the incessant incidents of Fulani pastoralists and farmers conflicts in all the Local Government Areas of Edo State which results in devastating consequences like ruination of lives and properties, crops, farmlands, and desertion of communities by people so affected by the violence, etc. The study was purely qualitative in nature and used the historical research design with a descriptive approach and provides a thorough understanding of the causes, effects and how the frequent violent clashes between the pastoral herdsmen and farmers in Edo State can be averted in future. The Key Informant Interview (KII) as well as the In-depth Interview (IDI) were used to generate data. The study’s population was 26,835 and a sample size of 52 respondents that were purposively selected. Our findings show that economic factors such as the fervent desire of the pastoral herdsmen to fend for their cattle and themselves due to limited resources, coupled with the will to forcefully take over the lands of the farmers as a result of the offensive and illegal weapons at their disposal, led to the violent clashes. The devastating effects of the violent conflicts were equally articulated while we strongly recommend that intelligence gathering and community policing, setting up of Conflict Resolution Committees in every local government area, the setting up of Cattle Ranch in the state as well as the clarion call on the Edo State Government to urgently flush out the armed herdsmen from the forests and bushes in communities where they usually hold people to ransom.',
    keywords: [
      'Farmers',
      'Farmlands',
      'Herdsmen',
      'Pastoral',
      'Violent conflicts',
    ],
    authorEmail: 'roland.ukhurebor@uniben.edu',
    coAuthorEmails: ['osagie.omoruyi@uniben.edu'],
    volumeNumber: 8,
    issueNumber: 1,
    articleType: 'research_article',
    pages: { start: 121, end: 140 },
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
