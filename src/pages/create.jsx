import { Link } from "react-router-dom";
import Web3 from "web3";
import { GOVERNANCE_ABI, GOVERNANCE_CA } from "../web3.config";

const Create = ({ account, apiKey }) => {
  const web3 = new Web3(`https://goerli.infura.io/v3/${apiKey}`);
  const GVN_contract = new web3.eth.Contract(GOVERNANCE_ABI, GOVERNANCE_CA);

  async function submitProposal(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    var title = data.get("title");
    var overview = data.get("overview");

    await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: account,
          to: GOVERNANCE_CA,
          data: GVN_contract.methods.openProposal(title, overview).encodeABI(),
        },
      ],
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-600 pt-14 pb-20">
      <div className="mx-80">
        <div>
          <Link to="/governance">
            <button className="">
              <div className="">Back</div>
            </button>
          </Link>
          <div className="text-4xl font-bold mt-4">Create a new proposal</div>
        </div>
        <div className="min-h-screen mt-16 bg-white rounded-xl shadow-2xl">
          <div className="p-6">
            <div>
              <div className="text-2xl pb-4 border-b-amber-600 border border-transparent">
                Proposal Description
              </div>
            </div>
            <form onSubmit={submitProposal} className="mt-12">
              <label className="block">
                <span className="block text-lg font-medium">Title</span>
                <input
                  className="border rounded-xl p-2 min-w-full mt-6"
                  name="title"
                />
              </label>
              <label className="block">
                <span className="block text-lg font-medium mt-12">
                  Overview
                </span>
                <input
                  className="border rounded-xl p-2 min-w-full h-64 mt-6"
                  name="overview"
                />
              </label>
              <div className="mt-12 flex justify-end">
                <button
                  type="submit"
                  className="border text-white rounded-xl bg-amber-700/80 hover:bg-amber-800/80 transition duration-300 hover:scale-95 p-2"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;