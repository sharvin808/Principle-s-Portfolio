import { getProfile } from './src/lib/sheets';
async function test() {
  const profile = await getProfile();
  console.log("PROFILE:", profile);
}
test();
