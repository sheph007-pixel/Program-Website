import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const plans = [
  // Health Plans
  { name: "Deluxe Platinum", category: "Health Plans", sortOrder: 1, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDjbxGFQKCtTLE-pAQjj6HAAaS3JHitaKhwlw2QteYgfDs?e=FdajUc" },
  { name: "Elite Health", category: "Health Plans", sortOrder: 2, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDiF-qR_lnSR46Cd9NCz5qgAculq2WeagWDxidEQ9i7DIc?e=aVy6jZ" },
  { name: "Freedom Platinum", category: "Health Plans", sortOrder: 3, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBfdf1DrXCGSKomJsf_91P7AbTkhqRxLH93Gk-qHTmLTrQ?e=h9kI87" },
  { name: "Premier Health", category: "Health Plans", sortOrder: 4, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCyEt8YEtvDSb02wOrhvpO1AaVg44QV1kxL2z86NMdygto?e=XJrtsi" },
  { name: "Choice Gold", category: "Health Plans", sortOrder: 5, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQC5MNDjfZKMQ7yWSHI_EB3SAefFq02DB42YyV0zTWepuRc?e=8wPAx0" },
  { name: "Freedom Gold", category: "Health Plans", sortOrder: 6, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAv3Z7Q9Qs8T7B2EYZPfIymAcps0iDCrTg7G8BjCc27yGo?e=mUpNG0" },
  { name: "Select Health", category: "Health Plans", sortOrder: 7, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBnSZsY1kfVR43xJdohvpMlAWhQuWx6ox8OvrwNGpjh7vo?e=BkILWK" },
  { name: "Basic Gold", category: "Health Plans", sortOrder: 8, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCGqetmNCvjSI5NMeT5iOmjAcewCSy2xov3oTOZQJu27to?e=QSjaJS" },
  { name: "Preferred Silver", category: "Health Plans", sortOrder: 9, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAYRhZ0CCxdQKyrTe9YO3NKAdAkv6VhRNe5SGAe9zkxDTE?e=kVdW9x" },
  { name: "Enhanced Silver", category: "Health Plans", sortOrder: 10, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAuc9wDHKnVRoXyPeQ4IY43AdvOEVhos94V5bt9mun5EZI?e=opToXJ" },
  { name: "Freedom Silver", category: "Health Plans", sortOrder: 11, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDH6B4j6MiuRZMie658uV20AbeaRwekwp7Hgfj-3Mgkg-I?e=ubZxvM" },
  { name: "Core Health", category: "Health Plans", sortOrder: 12, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAOp3ukpGTBToVCAEjQ3uVHAVf2g1j4ftsbsVoLwcGtzag?e=fxhCna" },
  { name: "Classic Silver", category: "Health Plans", sortOrder: 13, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBC2681O-G9QLN0l5ETbzDoAQIpbvHwbzkr3fTppEPAXDc?e=nCnyUV" },
  { name: "Saver HSA", category: "Health Plans", sortOrder: 14, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBHhZx5Gp8IQ4W-zYLmS1JzAUK2EA9tXOSwgoFz9uqQMhw?e=89V3r7" },
  { name: "Freedom Bronze", category: "Health Plans", sortOrder: 15, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDMspItNgscRJ_H3njoL5w3AZ9LKu6lgJTpCQhnda_QX3s?e=jP32OB" },

  // Dental Plans
  { name: "Advantage Dental (W Ortho)", category: "Dental Plans", sortOrder: 1, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQC1zNTdLbCfSKJSl0nZut-jAZYEVN2E6i8ehEcKIM0tdrU?e=D0Dbhr" },
  { name: "Complete Dental (W Ortho)", category: "Dental Plans", sortOrder: 2, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQARyqwnbTxmT5p_V5yPCvuFAeeaj1qBW6bltnCw1DGaadY?e=etPWcd" },
  { name: "Value Dental (W Ortho)", category: "Dental Plans", sortOrder: 3, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAJhfPyTeISR6g630yMPL7rAfIh0KqKCBDdMKy8wXNt1RI?e=9DW6ON" },
  { name: "Complete Dental", category: "Dental Plans", sortOrder: 4, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDsmA3LxY0xSa5Ubz-9uLD_AZOiVrHXjk3aF0lw2s-AHPg?e=h3KHAD" },
  { name: "Value Dental", category: "Dental Plans", sortOrder: 5, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCqpwo6dBnASrxCgQEZbj6bAZVQHgQnGK27Qb0dIvwQcic?e=vz2T5A" },
  { name: "Basic Dental", category: "Dental Plans", sortOrder: 6, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCCBYcyLhXyTKz3ztcFG6nSAaeCZYIRmoscfv-ODP183nA?e=VAmfh0" },
  { name: "Choice Dental", category: "Dental Plans", sortOrder: 7, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDRZP1EmrZjTYo6OxTAP5YNAe6cInudHdmeAe4EsgYdWGM?e=bNOAAW" },

  // Vision Plans
  { name: "Premium Vision", category: "Vision Plans", sortOrder: 1, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCGHsTU0pS-QJebH4j_09OWAZ2zV-EPZw4G8dajTD1RAco?e=Lctihu" },
  { name: "Standard Vision", category: "Vision Plans", sortOrder: 2, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDz2khRMs-8T6K52hyB6XyOAa_nb61a4xrpZDMRGjP4_K4?e=YIEVCe" },
  { name: "Value Vision", category: "Vision Plans", sortOrder: 3, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCIB4xpeM3hR7gJ-3b-FvRxAWidQM4y69kLD7txvrPpATA?e=ezJ4ic" },
  { name: "Base Vision", category: "Vision Plans", sortOrder: 4, summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCrPHVJa5-_Qo4F9rgxl2M6ARVgvx_XsqusN1EzYWgPQbY?e=MRuc8G" },

  // Supplemental
  { name: "Accident Insurance", category: "Supplemental", sortOrder: 1, summaryUrl: "https://kennionplans.com" },
  { name: "Cancer Insurance", category: "Supplemental", sortOrder: 2, summaryUrl: "https://kennionplans.com" },
  { name: "Critical Illness Insurance", category: "Supplemental", sortOrder: 3, summaryUrl: "https://kennionplans.com" },
  { name: "Disability Insurance", category: "Supplemental", sortOrder: 4, summaryUrl: "https://kennionplans.com" },
  { name: "Hospital + Surgery Insurance (GAP)", category: "Supplemental", sortOrder: 5, summaryUrl: "https://kennionplans.com" },
  { name: "Individual Life ($100k+)", category: "Supplemental", sortOrder: 6, summaryUrl: "https://kennionplans.com" },
  { name: "Voluntary Life (Max $100k)", category: "Supplemental", sortOrder: 7, summaryUrl: "https://kennionplans.com" },
];

async function seed() {
  console.log("Seeding plans...");

  // Clear existing plans
  await prisma.plan.deleteMany();

  // Insert all plans
  for (const plan of plans) {
    await prisma.plan.create({ data: plan });
  }

  console.log(`Seeded ${plans.length} plans.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
