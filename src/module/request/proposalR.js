import { FetchUtil } from "../util/fetchUtil";

export  class ProposalR {
    static root = "proposal"
    static list() {
        return FetchUtil.getAPI(`${this.root}/`)
    }
    static msg(data) {
        return FetchUtil.postAPI(`${this.root}/msg`, data)
    }
    static msgList(id) {
        return FetchUtil.getAPI(`${this.root}/msg/${id}`)
    }
    static vote(data) {
        return FetchUtil.postAPI(`${this.root}/vote`, data)
    }
    
    
    static rule() {
        return FetchUtil.getAPI(`${this.root}/rule`)
    }
}