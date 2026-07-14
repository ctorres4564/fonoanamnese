const fs = require('fs');
const path = require('path');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Types
      content = replaceAll(content, "'../../types/anamnesis'", "'src/domains/anamnesis'");
      content = replaceAll(content, "'../../../types/anamnesis'", "'src/domains/anamnesis'");
      
      // Schemas
      content = replaceAll(content, "'../../schemas/anamnesis'", "'src/domains/anamnesis'");
      content = replaceAll(content, "'../../../schemas/anamnesis'", "'src/domains/anamnesis'");
      content = replaceAll(content, "'../../schemas/motorDevelopment'", "'src/domains/anamnesis'");
      content = replaceAll(content, "'../../../schemas/motorDevelopment'", "'src/domains/anamnesis'");
      content = replaceAll(content, "'../../schemas/pregnancyBirthNeonatal'", "'src/domains/anamnesis'");

      // Components
      content = replaceAll(content, "'../../components/anamnesis/ChiefComplaintSection'", "'src/domains/anamnesis/chiefComplaint/components/ChiefComplaintSection'");
      content = replaceAll(content, "'../../components/anamnesis/InterviewDataSection'", "'src/domains/anamnesis/interview/components/InterviewDataSection'");
      content = replaceAll(content, "'../../components/anamnesis/PregnancyBirthNeonatalSection'", "'src/domains/anamnesis/pregnancy/components/PregnancyBirthNeonatalSection'");
      content = replaceAll(content, "'../../components/anamnesis/motor/MotorDevelopmentSection'", "'src/domains/anamnesis/motor/components/MotorDevelopmentSection'");
      
      content = replaceAll(content, "'../../../src/components/anamnesis/BirthHistorySection'", "'src/domains/anamnesis/pregnancy/components/BirthHistorySection'");
      content = replaceAll(content, "'../../../src/components/anamnesis/NeonatalHistorySection'", "'src/domains/anamnesis/pregnancy/components/NeonatalHistorySection'");
      content = replaceAll(content, "'../../../src/components/anamnesis/PregnancyHistorySection'", "'src/domains/anamnesis/pregnancy/components/PregnancyHistorySection'");
      
      content = replaceAll(content, "'../../components/anamnesis/AnamnesisWizard'", "'src/domains/anamnesis/shared/components/AnamnesisWizard'");
      content = replaceAll(content, "'../../components/anamnesis/SectionContainer'", "'src/domains/anamnesis/shared/components/SectionContainer'");

      // Fix relative paths for absolute src/
      if (content.includes("'src/domains/anamnesis")) {
         let dirPath = path.dirname(fullPath);
         content = content.replace(/'src\/domains\/anamnesis(.*?)'/g, (match, rest) => {
            let targetPath = path.resolve('src/domains/anamnesis' + rest);
            let rel = path.relative(dirPath, targetPath);
            let posixRel = rel.split(path.sep).join('/');
            if (!posixRel.startsWith('.')) posixRel = './' + posixRel;
            return `'${posixRel}'`;
         });
      }

      // specific type issue
      content = replaceAll(content, "Resolver<{ [x: string]: any; }, any, { [x: string]: any; }>", "any");

      // implicit any
      content = content.replace(/\(i\)/g, "(i: any)");

      // unsubscribe 
      content = content.replace(/let unsubscribe =/g, "let unsubscribe: any =");
      content = content.replace(/let unsubscribe;/g, "let unsubscribe: any;");

      fs.writeFileSync(fullPath, content);
    }
  }
}

walk(path.resolve('src'));
