/* eslint-disable max-len */
// migrate_articles.js
// Usage: mongosh "mongodb://localhost:27017/YOUR_DB_NAME" migrate_articles.js
// Migrate ONE ISSUE AT A TIME — change the array below for each run.

// ============================================================
// EDIT THIS ARRAY — one object per article
// ============================================================
const ARTICLES_TO_MIGRATE = [
  {
    title: "APPLYING METHODOLOGICAL APPROACHES TO LIBRARY AND INFORMATION SCIENCE (LIS) RESEARCH",
    abstract: "This paper seeks to examine the applicability of methodological approaches to Library and Information Science (LIS) research in African developing countries. The foci of the discourse are on two dominant methodologies of philosophy of science- naturalism and interpretative social science. Predictions and precise explanatory powers were highlighted as the determinants of the modernist approach found in naturalism. However, the inadequacy of naturalism in LIS research makes it imperative for a post modernist approved provided by the interpretative social science. Different epistemological strands that include grounded theory, hermeneutics, critical reality, phenomenology, structuralism and post structuralism, postmodernism, pragmatism and neo-pragmatism are x-rayed as suitable for understanding interpretative research in LIS. The paper concludes that the appropriate methodology used in a research depends on the approach and context. This paper recommends that LIS researchers in African developing countries should adopt either of these two methodologies in their research to enable them keep pace with their counterparts in the developed world.",
    keywords: ["Methodology", "naturalism", "interpretationalism", "library", "library and information science"],
    authorEmail: "esther.isah@uniben.edu",
    coAuthorEmails: ["godsent.omoregie@uniben.edu"],
    volumeNumber: 7,
    issueNumber: 1,
    articleType: "research_article",
    pages: { start: 1, end: 18 }
  },
  {
    title: "GENDER SPACE AND THE MISINTERPRETATION OF CHRISTIAN DOCTRINES IN WOMEN ABUSE: SOCIAL WORK INTERVENTION WITH WOMEN IN ABUSIVE RELATIONSHIP",
    abstract: "This paper x-rayed the spate of violence against women by using Mrs. Osinachi who died due to injuries she suffered from domestic assaults as a case study. It espoused the counsels and teaching of the Christian doctrines and how these are employed to manipulate women to accept and continue to endure the harsh and intimidating relationships with their spouses. The paper also established that the custodians of the Christian doctrines who are mainly men amplify the verses of the Bible that focus primarily on women to be submissive while they are silent about the areas that command men not to abuse their wives. Content analysis was use to analyzed secondary data which were comprehensively reviewed and important themes isolated and analyzed based on the goals of the study. The paper recommends that social worker should begin to offer direct services to women in churches and market places through workshop, seminar, symposium and person to person approach in order to liberate them (women) from any manipulation facilitated by religious counsels and teachings.",
    keywords: ["Spousal violence", "Osinachi", "Christian doctrines", "Divorce", "Social work"],
    authorEmail: "kelly.imafidon@uniben.edu",
    coAuthorEmails: [],
    volumeNumber: 7,
    issueNumber: 1,
    articleType: "research_article",
    pages: { start: 51, end: 64 }
  },
  {
    title: "EFFICIENCY OF AFRICAN STOCK MARKETS: A DYNAMIC MODEL APPROACH",
    abstract: "This study examined the efficiency of African stock markets. The Efficiency of the stock market is a necessary condition if funds are to be allocated to the highest-valued projects and investors rewarded adequately for their investment. Sixteen (16) African exchanges were investigated for the period 2013 to 2019, using data collected from World Bank Development Indicator, African Securities Exchange Association and the Bank for International Settlement databases. Analysis was carried out using the Generalised Method of Moments (GMM) first difference transformation in dynamic model framework. The findings revealed that previous returns, financial liquidity (external liquidity as well as stock market liquidity) and macroeconomic instability significantly determined returns in Africa, and this is at variance with efficient market proposition, implying that African Stock Markets are less efficient in the weak-form. This study recommend that African Stock Markets should be integrated and automated to reduce transaction cost and this will attract local and foreign institutional investors, thus boosting trading activities and improve market efficiency. Also, more derivative instruments should introduce to stimulate liquidity, and policies aimed at stabilising the macro-economy should be initiated.",
    keywords: ["African Stock Markets", "Dynamic Panel Model", "Market Efficiency", "Difference Generalised Method of Moments", "African Stock Markets Efficiency"],
    authorEmail: "monday.uhunmwangho@uniben.edu",
    coAuthorEmails: [],
    volumeNumber: 7,
    issueNumber: 1,
    articleType: "research_article",
    pages: { start: 65, end: 82 }
  },
  {
    title: "INFORMATION AND COMMUNICATIONTECHNOLOGY (ICT) AND KNOWLEDGE SHARING: THE ROLE OF LIBRARY",
    abstract: "Knowledge has become an important commodity that nobody can do without. A person with a wealth of knowledge is usually held in high esteem as a result they tend to hoard knowledge to maintain their high esteem. Consequently, important ideas, experiences, innovations, discoveries had been lost due to inadequate knowledge sharing. However man since inception has been exchanging ideas in the medium suitable to them,themost common beingstorey-telling and Community of Practice (CoP) but with the advent of ICT, knowledge sharing has been enhanced.Thus, individuals, organization and institutions have resulted to adopting ICT tools as a viable means of sharing knowledge. The study examined ICT and knowledge sharing: the role of the library. It described knowledge, knowledge sharing, benefits and methods of knowledge sharing, technologies used in sharing knowledge, skills required and why they are important, the role of library, challenges and way forward. It was examined that knowledge plays a dominant role in the thought of every individual and knowledge sharing is the vehicle that enhances knowledge and its creation. Knowledge can be shared through books, journals, CoP and storey-telling. The technologies used to facilitate knowledge sharing includeinstitutional repositories, web2.0, intranet, extranet and internet. Based on the foregoing it was examined that ICT skills such as basic computer skills internet search skills are necessary for effective knowledge sharing. It was also examined that the skills are necessary because only those who are digitally literate can use digital tools to work across network and share knowledge. It also shows the role of the library to include creation of knowledgerepositories, enhance the knowledge environment, and disseminate knowledge. The challenges affecting knowledge sharing includes lack of ICT skills, poor internet connection and fear of value. It was recommended that knowledge should be provided rather than hoarding",
    keywords: ["Knowledge Sharing", "ICT", "Skills", "Library", "Knowledge management"],
    authorEmail: "chinwendu.eneh@uniben.edu",
    coAuthorEmails: ["barbaken.enterprise@yahoo.com"],
    volumeNumber: 7,
    issueNumber: 1,
    articleType: "research_article",
    pages: { start: 83, end: 97 }
  },
  {
    title: "THE INFLUENCE OF DIVORCE ON CHILDREN’S EDUCATION IN SOME SELECTED SECONDARY SCHOOLS IN EGOR LOCAL GOVERNMENT AREA, EDO STATE, NIGERIA.",
    abstract: "This study examined the influences of parental divorce on children’s education in some selected secondary schools in Egor Local Government Area, Edo State, Nigeria. The linear regression at .05 level of significance and displayed on ANOVA table was adopted. A sample of 50 secondary school students was randomly selected from 5 schools respectively, which totaled 250 participants. The instrument for the study is a Likert type scale of twenty items questionnaire, administered twice to twenty children from divorced homes that were not to be part of the study, after three weeks. The data obtained from these two administrations were subjected to Spearman’s rho correlation statistics and a test-retest reliability coefficient of 0.88 was obtained. The findings of this study established that children of separated parents encounter challenges adjusting with their education, based on the influences on their school attendance, performance and assignments. It is recommended that essential collaboration is by helping professionals, such as social workers, teachers and counselors to help enhance the educational achievement of children from divorced homes as well as their parents.",
    keywords: ["Assignment", "Children’s education", "Divorce", "School attendance", "Performance"],
    authorEmail: "tracy.omorogiuwa@uniben.edu",
    coAuthorEmails: [],
    volumeNumber: 7,
    issueNumber: 1,
    articleType: "research_article",
    pages: { start: 110, end: 120 }
  }
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
